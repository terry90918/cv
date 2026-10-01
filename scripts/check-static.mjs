import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const slugs = ['jurislm', 'nidin', 'vclass', 'gj', 'channel-t', 'backlight-memory']

assert.ok(existsSync('out/index.html'), 'Static entry must be exported')

for (const locale of ['zh-TW', 'en']) {
  for (const page of ['', 'contact/', ...slugs.map(slug => `case-study/${slug}/`)]) {
    const html = readFileSync(`out/${locale}/${page}index.html`, 'utf8')

    assert.match(html, new RegExp(`lang="${locale}"`))
    assert.ok(html.includes(`${prefix}/images/profile/tien-yi-chen.png`) || page.startsWith('case-study/'))
    assert.doesNotMatch(html, /http:\/\/localhost:3000/)
  }
}

for (const file of ['og.png', 'icon.svg', '404.html', '.nojekyll', 'images/profile/tien-yi-chen.png', 'models/lanyard/card.glb', 'images/3d-card/pin.webp', 'images/cursor/cursor.webp']) {
  assert.ok(existsSync(`out/${file}`), file)
}

const png = readFileSync('out/og.png')

assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
console.log('Static entry, both locales, all cases, assets, OG PNG, and 404 passed.')
