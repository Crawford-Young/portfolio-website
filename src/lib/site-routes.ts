import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export const SITE_URL = 'https://crawfordyoung.dev'

export const STATIC_ROUTES: readonly string[] = [
  '/',
  '/projects',
  '/experience',
  '/hobbies',
  '/privacy',
  '/contact',
]

export function siteRoutes(): readonly string[] {
  return [...STATIC_ROUTES, ...projects.map((project) => `/projects/${project.slug}`)]
}

export function buildSitemap(lastModified: Date): MetadataRoute.Sitemap {
  return siteRoutes().map((route) => ({
    url: route === '/' ? SITE_URL : `${SITE_URL}${route}`,
    lastModified,
  }))
}
