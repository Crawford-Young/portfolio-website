import type { ComponentType } from 'react'

export const writingContent: Readonly<Record<string, () => Promise<{ default: ComponentType }>>> = {
  'halfway-found': () => import('@/content/writing/halfway-found.mdx'),
  almost: () => import('@/content/writing/almost.mdx'),
  'you-cant-halfway-jump': () => import('@/content/writing/you-cant-halfway-jump.mdx'),
  'the-hiker': () => import('@/content/writing/the-hiker.mdx'),
}
