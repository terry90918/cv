import assert from 'node:assert/strict'

const expected = ['about', 'featured-works', 'experience', 'contact', 'skills']
const origin = 'http://localhost:3000'

for (const locale of ['zh-TW', 'en']) {
  const response = await fetch(`${origin}/${locale}`)
  const html = await response.text()

  const sections = [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)]
    .map(match => match[1])
    .filter(id => expected.includes(id))

  const nav = html.match(/<nav\b[^>]*aria-label="(?:主要導覽|Main navigation)"[\s\S]*?<\/nav>/)[0]
  const destinations = [...nav.matchAll(/href="([^"]+)"/g)].slice(0, 5).map(match => new URL(match[1], origin))

  assert.equal(response.status, 200)
  assert.deepEqual(sections, expected, `${locale}: page order must match dock order`)
  assert.deepEqual(
    destinations.map(url => url.hash),
    expected.map(id => `#${id}`)
  )
  assert.ok(destinations.every(url => url.pathname.replace(/\/$/, '') === `/${locale}`))
  const hero = html.match(/<section\b[^>]*id="top"[\s\S]*?<\/section>/)[0]

  assert.match(hero, new RegExp(`href="/${locale}/?#contact"`))
}

console.log('Both locales: page order, dock destinations, and hero contact target passed.')
