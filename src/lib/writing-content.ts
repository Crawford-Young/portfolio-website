import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const COLLECTION_MIN_WORDS = 400
export const STORY_MIN_WORDS = 800
export const PROJECT_MIN_WORDS = 300

const CONTENT_DIR = join(process.cwd(), 'src', 'content')

export function readContentSource(dir: 'writing' | 'projects', slug: string): string {
  return readFileSync(join(CONTENT_DIR, dir, `${slug}.mdx`), 'utf8')
}

// Ported from instrumenttuner src/lib/guide-content.ts (adsense-w2), with `{}` added to the
// strip class so Poem template-literal braces don't count as tokens.
export function countWords(mdx: string): number {
  const stripped = mdx
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`|~{}]/g, ' ')
  return stripped.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length
}
