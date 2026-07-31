import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/lib/ui'
import { Spotlight } from '@/components/effects/spotlight'
import { GlowCard } from '@/components/effects/glow-card'
import { collections, STORY, writingPath } from '@/data/writing'

const SUBSTACK_URL = 'https://crawfordyoung.substack.com/subscribe'
const SINGLE_POEM_COUNT = 1

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Poetry collections and a short story — plus where to read more on Substack.',
  alternates: { canonical: '/writing' },
  openGraph: {
    title: 'Writing',
    description: 'Poetry collections and a short story — plus where to read more on Substack.',
    url: '/writing',
    siteName: 'Crawford Young',
    type: 'website',
  },
}

function poemCountLabel(count: number): string {
  return count === SINGLE_POEM_COUNT ? '1 poem' : `${count} poems`
}

export default function WritingPage(): React.JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Spotlight className="rounded-2xl mb-12">
        <div className="py-12 px-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Words</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Writing</h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            Poetry collections and a short story, plus where to read more.
          </p>
        </div>
      </Spotlight>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map((collection) => (
          <GlowCard key={collection.slug} className="h-full">
            <Card className="h-full bg-surface/40 backdrop-blur-md border-border/60 hover:border-border transition-colors group">
              <CardContent className="p-6 flex flex-col gap-4 h-full">
                <div className="flex items-start justify-between">
                  <h2 className="font-semibold text-foreground tracking-tight text-base leading-snug pr-4">
                    {collection.title}
                  </h2>
                  <Link
                    href={writingPath(collection.slug)}
                    aria-label={`Read ${collection.title}`}
                    className="shrink-0"
                  >
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {collection.description}
                </p>
                <span className="text-xs text-muted-foreground">
                  {poemCountLabel(collection.poems.length)}
                </span>
              </CardContent>
            </Card>
          </GlowCard>
        ))}
        <GlowCard className="h-full">
          <Card className="h-full bg-surface/40 backdrop-blur-md border-border/60 hover:border-border transition-colors group">
            <CardContent className="p-6 flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-foreground tracking-tight text-base leading-snug pr-4">
                  {STORY.title}
                </h2>
                <Link
                  href={writingPath(STORY.slug)}
                  aria-label={`Read ${STORY.title}`}
                  className="shrink-0"
                >
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </Link>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {STORY.description}
              </p>
              <span className="text-xs text-muted-foreground">Short story</span>
            </CardContent>
          </Card>
        </GlowCard>
        <GlowCard className="h-full">
          <Card className="h-full bg-surface/40 backdrop-blur-md border-border/60 hover:border-border transition-colors group">
            <CardContent className="p-6 flex flex-col gap-4 h-full">
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-foreground tracking-tight text-base leading-snug pr-4">
                  Read these on Substack
                </h2>
                <a
                  href={SUBSTACK_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Read on Substack"
                  className="shrink-0"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                Subscribe on Substack for new poems and stories as they&apos;re written.
              </p>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Subscribe on Substack
              </a>
            </CardContent>
          </Card>
        </GlowCard>
      </div>
    </div>
  )
}
