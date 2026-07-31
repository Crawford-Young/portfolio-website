import { describe, it, expect } from 'vitest'
import { collections, CollectionSchema, STORY, writingPath, writingSlugs } from '@/data/writing'

describe('writing registry', () => {
  it('has the three approved collections in order', () => {
    expect(collections.map((c) => c.slug)).toEqual([
      'halfway-found',
      'almost',
      'you-cant-halfway-jump',
    ])
  })

  it('every collection satisfies the schema', () => {
    for (const collection of collections) {
      expect(() => CollectionSchema.parse(collection)).not.toThrow()
    }
  })

  it('carries all ten poems under their agreed substack-canonical anchors', () => {
    const anchors = collections.flatMap((c) => c.poems.map((p) => `${c.slug}#${p.anchor}`))
    expect(anchors).toEqual([
      'halfway-found#waiting',
      'halfway-found#paradox',
      'halfway-found#role-model',
      'almost#wonder',
      'almost#strangers',
      'almost#chance',
      'you-cant-halfway-jump#paradise-falls',
      'you-cant-halfway-jump#light-at-the-end-of-the-tunnel',
      'you-cant-halfway-jump#enjoy-these-last-moments',
      'you-cant-halfway-jump#souls',
    ])
  })

  it('writingSlugs lists collections then the story', () => {
    expect(writingSlugs()).toEqual([
      'halfway-found',
      'almost',
      'you-cant-halfway-jump',
      'the-hiker',
    ])
  })

  it('writingPath builds the route', () => {
    expect(writingPath(STORY.slug)).toBe('/writing/the-hiker')
  })
})
