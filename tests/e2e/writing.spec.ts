import { test, expect } from '@playwright/test'
import { SITE_URL } from '@/lib/site-routes'
import { collections } from '@/data/writing'

test('writing hub lists the collections and the story', async ({ page }) => {
  await page.goto('/writing')
  await expect(page.getByRole('heading', { name: 'Writing', level: 1 })).toBeVisible()
  await expect(page.getByText('Halfway Found')).toBeVisible()
  await expect(page.getByText('The Hiker')).toBeVisible()
})

test('every collection serves its poem anchors and canonical url', async ({ page }) => {
  for (const collection of collections) {
    await page.goto(`/writing/${collection.slug}`)
    for (const poem of collection.poems) {
      await expect(page.locator(`#${poem.anchor}`)).toBeVisible()
    }
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBe(`${SITE_URL}/writing/${collection.slug}`)
  }
})

test('the hiker is served with its canonical url', async ({ page }) => {
  await page.goto('/writing/the-hiker')
  await expect(page.getByRole('heading', { name: 'The Hiker', level: 1 })).toBeVisible()
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBe(`${SITE_URL}/writing/the-hiker`)
})

test('sitemap lists the writing routes', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  expect(xml).toContain(`${SITE_URL}/writing`)
  expect(xml).toContain(`${SITE_URL}/writing/the-hiker`)
})

test('project pages render the write-up prose', async ({ page }) => {
  await page.goto('/projects/component-library')
  await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible()
})

test('nav reaches writing', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Writing' })
    .click()
  await expect(page).toHaveURL('/writing')
})

test('about page is served with its canonical url', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible()
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
  expect(canonical).toBe(`${SITE_URL}/about`)
})

test('nav reaches about', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click()
  await expect(page).toHaveURL('/about')
})
