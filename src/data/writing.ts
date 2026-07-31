import { z } from 'zod'

export const PoemSchema = z.object({
  anchor: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
})

export const CollectionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(10),
  order: z.number().int().positive(),
  poems: z.array(PoemSchema).min(3),
})

export type Poem = z.infer<typeof PoemSchema>
export type Collection = z.infer<typeof CollectionSchema>

export const collections: readonly Collection[] = [
  {
    slug: 'halfway-found',
    title: 'Halfway Found',
    description:
      'Three poems about auditing yourself against a standard you set — the conditions we put on self-love, becoming a contradiction on purpose, and the younger self as judge.',
    order: 1,
    poems: [
      { anchor: 'waiting', title: 'Waiting' },
      { anchor: 'paradox', title: 'Paradox' },
      { anchor: 'role-model', title: 'Role Model' },
    ],
  },
  {
    slug: 'almost',
    title: 'Almost',
    description:
      'Three states of near-connection — the stranger who might be something, the drift back into being strangers, and the chance that didn’t hold.',
    order: 2,
    poems: [
      { anchor: 'wonder', title: 'Wonder' },
      { anchor: 'strangers', title: 'Strangers' },
      { anchor: 'chance', title: 'Chance' },
    ],
  },
  {
    slug: 'you-cant-halfway-jump',
    title: "You Can't Halfway Jump",
    description:
      'Four poems from one year — commit to the jump, keep walking when the light goes, savor the ending, and accept what nobody knows.',
    order: 3,
    poems: [
      { anchor: 'paradise-falls', title: 'Paradise Falls' },
      { anchor: 'light-at-the-end-of-the-tunnel', title: 'Light at the End of the Tunnel' },
      { anchor: 'enjoy-these-last-moments', title: 'Enjoy These Last Moments' },
      { anchor: 'souls', title: 'Souls' },
    ],
  },
]

export const STORY = {
  slug: 'the-hiker',
  title: 'The Hiker',
  description:
    'A short story about effort, responsibility, and choice — what different heights ask of us, and where we are willing to remain.',
} as const

export function writingSlugs(): readonly string[] {
  return [...collections.map((c) => c.slug), STORY.slug]
}

export function writingPath(slug: string): string {
  return `/writing/${slug}`
}
