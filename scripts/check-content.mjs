import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'

import { generateSlug, extractHeadings } from '../src/lib/extract-headings.ts'

assert.equal(generateSlug('我的角色'), '我的角色')
assert.equal(generateSlug('My role'), 'my-role')
assert.equal(extractHeadings('## 我的角色\n\n### 交付成果')[1].slug, '交付成果')
assert.ok(existsSync('src/lib/profile.ts'), 'Bilingual profile must exist')
const { profiles, projectSlugs, localeHref } = await import('../src/lib/profile.ts')

const shape = value =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]))
      : typeof value

assert.deepEqual(shape(profiles.en), shape(profiles['zh-TW']))
assert.equal(
  localeHref('/zh-TW/case-study/jurislm', 'en', '#%E6%88%91%E7%9A%84%E8%A7%92%E8%89%B2'),
  '/en/case-study/jurislm#my-role'
)
assert.equal(localeHref('/en/case-study/jurislm', 'zh-TW', '#outcomes'), '/zh-TW/case-study/jurislm#成果')
assert.equal(localeHref('/en', 'zh-TW', '#experience'), '/zh-TW#experience')
assert.equal(localeHref('/en/contact', 'zh-TW'), '/zh-TW/contact')

const css = readFileSync('src/app/globals.css', 'utf8')
const lightTokens = css.slice(css.indexOf(':root {'), css.indexOf('\n.dark {'))
const token = name => lightTokens.match(new RegExp(`--${name}:\\s*([^;]+);`))[1]

const luminance = color => {
  if (color.startsWith('#')) {
    const rgb = color
      .slice(1)
      .match(/.{2}/g)
      .map(channel => parseInt(channel, 16) / 255)

    const linear = rgb.map(value => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))

    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
  }

  const [L, C, hue] = color.match(/[\d.]+/g).map(Number)
  const a = C * Math.cos((hue * Math.PI) / 180)
  const b = C * Math.sin((hue * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3

  return (
    0.2126 * (4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s) +
    0.7152 * (-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s) +
    0.0722 * (-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  )
}

for (const foreground of ['muted-foreground', 'accent-ink']) {
  for (const background of ['background', 'background-darker', 'card']) {
    const ink =
      foreground === 'accent-ink' && !lightTokens.includes('--accent-ink:') ? token('accent') : token(foreground)

    const contrast = (luminance(token(background)) + 0.05) / (luminance(ink) + 0.05)

    assert.ok(contrast >= 4.5, `${foreground} on ${background}: ${contrast.toFixed(2)}:1 must be at least 4.5:1`)
  }
}

for (const locale of ['zh-TW', 'en']) {
  const directory = `src/content/case-studies/${locale}`

  assert.deepEqual(
    readdirSync(directory)
      .map(file => file.replace(/\.mdx$/, ''))
      .sort(),
    [...projectSlugs].sort()
  )

  for (const slug of projectSlugs) {
    const content = readFileSync(`${directory}/${slug}.mdx`, 'utf8')
    const headings = extractHeadings(content)

    assert.ok(headings.length >= 3, `${locale}/${slug} requires headings`)
    assert.ok(headings.every(heading => heading.slug.length > 0))
    assert.equal(new Set(headings.map(heading => heading.slug)).size, headings.length)
    assert.doesNotMatch(content, /Zolt|Lumio|Trackflow|Orion Labs|Stackwise/)
  }

  const juris = readFileSync(`${directory}/jurislm.mdx`, 'utf8')

  assert.match(juris, /0\.957/)
  assert.match(juris, /20/)
}

console.log('Bilingual profile, six matching cases, Unicode anchors, locale links, and text contrast passed.')
