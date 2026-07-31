import type { ComponentType } from 'react'

export const projectContent: Readonly<Record<string, () => Promise<{ default: ComponentType }>>> = {
  'component-library': () => import('@/content/projects/component-library.mdx'),
  'portfolio-website': () => import('@/content/projects/portfolio-website.mdx'),
  cybond: () => import('@/content/projects/cybond.mdx'),
  'web-dev-club': () => import('@/content/projects/web-dev-club.mdx'),
  'ai-chess-bot': () => import('@/content/projects/ai-chess-bot.mdx'),
  'instrument-tuner': () => import('@/content/projects/instrument-tuner.mdx'),
  'ai-pacman': () => import('@/content/projects/ai-pacman.mdx'),
  'html-idle-game': () => import('@/content/projects/html-idle-game.mdx'),
}
