import Link from 'next/link'
import { Card, CardContent, Badge } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'

export function FeaturedProjectCard() {
  const project = projects[0]
  if (!project) return null
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border group">
        <CardContent className="p-6 flex flex-col gap-3 h-full justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em]">
                Featured
              </p>
              <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
            </div>
            <h3 className="font-semibold text-foreground text-sm tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
