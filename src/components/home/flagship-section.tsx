import type { JSX } from 'react'
import Image from 'next/image'
import { ExternalLink, Github, Package } from 'lucide-react'
import { Badge, Button } from '@/lib/ui'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

export function FlagshipSection({
  project,
  reverse = false,
}: {
  project: Project
  reverse?: boolean
}): JSX.Element {
  return (
    <section
      className={cn(
        'flex flex-col md:flex-row items-center gap-8 md:gap-12',
        reverse && 'md:flex-row-reverse'
      )}
    >
      {project.screenshot && (
        <div className="w-full md:w-1/2 shrink-0 rounded-xl border border-border/60 overflow-hidden shadow-2xl shadow-black/30">
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            width={1440}
            height={900}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{project.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">{project.pitch}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.url && (
            <Button asChild>
              <a href={project.url} target="_blank" rel="noreferrer">
                {project.ctaLabel ?? 'Try it live'} <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.repo && (
            <Button asChild variant="ghost">
              <a href={project.repo} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
          {project.npm && (
            <Button asChild variant="ghost">
              <a href={project.npm} target="_blank" rel="noreferrer">
                <Package className="h-4 w-4" /> npm
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
