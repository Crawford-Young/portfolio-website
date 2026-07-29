import { test, expect } from '@playwright/test'

const PUBLISHER_LINE = 'google.com, pub-4628379278051632, DIRECT, f08c47fec0942fa0'

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
