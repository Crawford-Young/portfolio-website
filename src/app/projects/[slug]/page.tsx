import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge, Button } from '@/lib/ui'
import { ArrowLeft, Github, ExternalLink, Package } from 'lucide-react'
import { Prose } from '@/components/writing/prose'
import { projects } from '@/data/projects'
import { projectContent } from './content-map'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Not found' }
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      siteName: 'Crawford Young',
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const loader = projectContent[slug]
  if (!loader) notFound()
  const { default: Writeup } = await loader()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.03em]">{project.title}</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-6">
        {project.tech.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex gap-3 mt-8">
        {project.repo && (
          <Button asChild variant="outline" size="sm">
            <a href={project.repo} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4 mr-2" /> Source code
            </a>
          </Button>
        )}
        {project.url && (
          <Button asChild variant="default" size="sm">
            <a href={project.url} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" /> Live site
            </a>
          </Button>
        )}
        {project.npm && (
          <Button asChild variant="outline" size="sm">
            <a href={project.npm} target="_blank" rel="noreferrer">
              <Package className="h-4 w-4 mr-2" /> npm
            </a>
          </Button>
        )}
      </div>
      <div className="mt-12 border-t border-border pt-10">
        <Prose>
          <Writeup />
        </Prose>
      </div>
    </div>
  )
}
