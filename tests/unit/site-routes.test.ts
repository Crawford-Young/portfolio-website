import { describe, it, expect } from 'vitest'
import { SITE_URL, siteRoutes, buildSitemap } from '@/lib/site-routes'
import { projects } from '@/data/projects'
import { writingSlugs, writingPath } from '@/data/writing'

describe('site-routes', () => {
  it('points at the apex domain', () => {
    expect(SITE_URL).toBe('https://crawfordyoung.dev')
  })

  it('includes every static route', () => {
    expect(siteRoutes()).toEqual(
      expect.arrayContaining([
        '/',
        '/projects',
        '/experience',
        '/hobbies',
        '/writing',
        '/privacy',
        '/contact',
      ])
    )
  })

  it('includes a detail route for every project', () => {
    const routes = siteRoutes()
    for (const project of projects) {
      expect(routes).toContain(`/projects/${project.slug}`)
    }
  })

  it('includes a route for every writing piece', () => {
    const routes = siteRoutes()
    for (const slug of writingSlugs()) {
      expect(routes).toContain(writingPath(slug))
    }
  })

  it('excludes debug routes', () => {
    expect(siteRoutes()).not.toContain('/sentry-example-page')
  })

  it('builds absolute sitemap urls without a trailing slash on the root', () => {
    const now = new Date('2026-07-28T00:00:00.000Z')
    const entries = buildSitemap(now)
    expect(entries[0]).toEqual({ url: 'https://crawfordyoung.dev', lastModified: now })
    expect(entries).toHaveLength(siteRoutes().length)
    for (const entry of entries) {
      expect(entry.url.startsWith('https://crawfordyoung.dev')).toBe(true)
      expect(entry.url.endsWith('/')).toBe(false)
    }
  })

  it('builds absolute sitemap urls for every writing route', () => {
    const now = new Date('2026-07-28T00:00:00.000Z')
    const entries = buildSitemap(now)
    const urls = entries.map((e) => e.url)
    for (const slug of writingSlugs()) {
      expect(urls).toContain(`https://crawfordyoung.dev${writingPath(slug)}`)
    }
  })
})
