import { describe, it, expect } from 'vitest'
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
