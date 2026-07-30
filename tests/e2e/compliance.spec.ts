import { test, expect } from '@playwright/test'

import { SITE_URL } from '@/lib/site-routes'

const PUBLISHER_LINE = 'google.com, pub-4628379278051632, DIRECT, f08c47fec0942fa0'
const PUBLISHER_ID = 'ca-pub-4628379278051632'

test('ads.txt serves the publisher line as plain text', async ({ request }) => {
  const response = await request.get('/ads.txt')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/plain')
  expect(await response.text()).toContain(PUBLISHER_LINE)
})

test('robots.txt is served and references the sitemap', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('Sitemap:')
})

test('sitemap.xml is served and lists the privacy page', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  expect(await response.text()).toContain('/privacy')
})

test('privacy page is reachable', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: /privacy policy/i, level: 1 })).toBeVisible()
})

test('contact page is reachable', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: /contact/i, level: 1 })).toBeVisible()
})

test('debug routes are gone', async ({ request }) => {
  expect((await request.get('/sentry-example-page')).status()).toBe(404)
})

test('unknown paths return a real 404 status', async ({ request }) => {
  expect((await request.get('/definitely-not-a-real-page')).status()).toBe(404)
})

// metadataBase alone emits NOTHING — it only resolves relative urls inside other
// metadata fields, so without an openGraph block this page advertised no canonical
// origin at all. That absence reads as clean to any check looking for a WRONG
// origin, which is why it survived the whole W1 wave.
test('canonical metadata advertises the production origin', async ({ page }) => {
  await page.goto('/')
  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content')
  expect(ogUrl).toBe(SITE_URL)
})

// The adsbygoogle loader is strategy="lazyOnload", so it exists only once JS has
// run. This meta tag is in the SERVED html, so verification never depends on the
// crawler executing anything. Asserted against the raw response body for that
// reason — a rendered-DOM check here would pass on the loader alone.
test('the adsense account is verifiable without javascript', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain(`name="google-adsense-account" content="${PUBLISHER_ID}"`)
})
