import Link from 'next/link'
import { Card, CardContent, Badge } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { ArrowUpRight, Github, ExternalLink, Package } from 'lucide-react'
import type { Project } from '@/types'

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project
  featured?: boolean
}) {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface/40 backdrop-blur-md border-border/60 hover:border-border transition-colors group">
        <CardContent className="p-6 flex flex-col gap-4 h-full">
          <div className="flex items-start justify-between">
            <h2 className="font-semibold text-foreground tracking-tight text-base leading-snug pr-4">
              {project.title}
            </h2>
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`View ${project.title}`}
              className="shrink-0"
            >
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {featured && project.pitch ? project.pitch : project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-3 w-3" /> Source
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> Live
              </a>
            )}
            {project.npm && (
              <a
                href={project.npm}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Package className="h-3 w-3" /> npm
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
