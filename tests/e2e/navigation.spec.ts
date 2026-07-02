import { test, expect } from '@playwright/test'

test('home page loads with hero', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Crawford Young/)
  await expect(page.getByRole('navigation')).toBeVisible()
})

test('projects page lists all projects', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible()
  await expect(page.getByText('@crawfordyoung/ui Component Library')).toBeVisible()
  await expect(page.getByText('Cybond')).toBeVisible()
  await expect(page.getByText('HTML Idle Game')).toBeVisible()
})

test('component library card shows live and npm links', async ({ page }) => {
  await page.goto('/projects')
  const card = page.locator('text=@crawfordyoung/ui Component Library').locator('../..')
  await expect(card.getByRole('link', { name: /live/i })).toHaveAttribute(
    'href',
    'https://ui.crawfordyoung.dev'
  )
  await expect(card.getByRole('link', { name: /npm/i })).toHaveAttribute(
    'href',
    'https://www.npmjs.com/package/@crawfordyoung/ui'
  )
})

test('component library detail page shows npm button', async ({ page }) => {
  await page.goto('/projects/component-library')
  await expect(page.getByRole('link', { name: /npm/i })).toHaveAttribute(
    'href',
    'https://www.npmjs.com/package/@crawfordyoung/ui'
  )
})

test('cybond card shows live link', async ({ page }) => {
  await page.goto('/projects')
  const card = page.locator('text=Cybond').locator('../..')
  await expect(card.getByRole('link', { name: /live/i })).toHaveAttribute(
    'href',
    'https://cybond.crawfordyoung.dev'
  )
})

test('instrument tuner card shows live link', async ({ page }) => {
  await page.goto('/projects')
  const card = page.locator('text=Instrument Tuner').locator('../..')
  await expect(card.getByRole('link', { name: /live/i })).toHaveAttribute(
    'href',
    'https://music.crawfordyoung.dev'
  )
})

test('nav links navigate correctly', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /projects/i }).click()
  await expect(page).toHaveURL('/projects')
  await page.getByRole('link', { name: /experience/i }).click()
  await expect(page).toHaveURL('/experience')
})

test('project detail back link returns to projects', async ({ page }) => {
  await page.goto('/projects/cybond')
  await page.getByRole('link', { name: /back to projects/i }).click()
  await expect(page).toHaveURL('/projects')
})
