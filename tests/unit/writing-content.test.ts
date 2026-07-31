import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { compile } from '@mdx-js/mdx'
import { describe, it, expect } from 'vitest'
import { collections, STORY, writingSlugs } from '@/data/writing'
import {
  COLLECTION_MIN_WORDS,
  countWords,
  PROJECT_MIN_WORDS,
  readContentSource,
  STORY_MIN_WORDS,
} from '@/lib/writing-content'

describe('countWords', () => {
  it('counts prose words, not markup', () => {
    expect(countWords('# Title\n\nTwo words [link text](/writing/x) *here*.')).toBe(6)
  })

  it('counts poem lines inside a Poem template literal, not the braces', () => {
    expect(countWords('<Poem>{`one line\ntwo more`}</Poem>')).toBe(4)
  })
})

describe('floors', () => {
  it('are the plan constants', () => {
    expect(COLLECTION_MIN_WORDS).toBe(400)
    expect(STORY_MIN_WORDS).toBe(800)
    expect(PROJECT_MIN_WORDS).toBe(300)
  })
})

describe('readContentSource', () => {
  it('throws for a missing source file', () => {
    expect(() => readContentSource('writing', 'not-a-real-slug')).toThrow()
  })
})

describe('writing content files', () => {
  it('every writing slug has a source file that compiles as MDX', async () => {
    for (const slug of writingSlugs()) {
      await expect(compile(readContentSource('writing', slug)), slug).resolves.toBeDefined()
    }
  })

  it('every collection page carries its poem anchors', () => {
    for (const collection of collections) {
      const source = readContentSource('writing', collection.slug)
      for (const poem of collection.poems) {
        expect(source, `${collection.slug}#${poem.anchor}`).toContain(`id="${poem.anchor}"`)
      }
    }
  })

  it('every collection meets the word floor', () => {
    for (const collection of collections) {
      const words = countWords(readContentSource('writing', collection.slug))
      expect(words, collection.slug).toBeGreaterThanOrEqual(COLLECTION_MIN_WORDS)
    }
  })

  it('the story meets its floor', () => {
    const words = countWords(readContentSource('writing', STORY.slug))
    expect(words).toBeGreaterThanOrEqual(STORY_MIN_WORDS)
  })

  it('the paradise falls collection links to the carsickyak cover', () => {
    expect(readContentSource('writing', 'you-cant-halfway-jump')).toContain(
      'https://carsickyak.crawfordyoung.dev'
    )
  })

  it('no orphan writing files outside the registry', () => {
    const files = readdirSync(join(process.cwd(), 'src', 'content', 'writing'))
    const slugs = new Set(writingSlugs())
    for (const file of files) {
      expect(slugs.has(file.replace(/\.mdx$/, '')), file).toBe(true)
    }
  })
})
