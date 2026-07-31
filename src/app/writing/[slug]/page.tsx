import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { collections, STORY, writingPath, writingSlugs } from '@/data/writing'
import { Prose } from '@/components/writing/prose'
import { writingContent } from '../content-map'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return writingSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const collection = collections.find((c) => c.slug === slug)
  const title = collection ? collection.title : STORY.title
  const description = collection ? collection.description : STORY.description
  return {
    title,
    description,
    alternates: { canonical: writingPath(slug) },
    openGraph: {
      title,
      description,
      url: writingPath(slug),
      siteName: 'Crawford Young',
      type: 'article',
    },
  }
}

export default async function WritingPiecePage({ params }: Params) {
  const { slug } = await params
  const loader = writingContent[slug]
  if (!loader) notFound()
  const { default: Content } = await loader()
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" /> Back to writing
      </Link>
      <Prose>
        <Content />
      </Prose>
    </div>
  )
}
