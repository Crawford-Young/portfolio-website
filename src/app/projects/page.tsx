import type { Metadata } from 'next'
import { Spotlight } from '@/components/effects/spotlight'
import { ProjectCard } from '@/components/projects/project-card'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected personal projects — component libraries, AI tools, and web experiments.',
}

export default function ProjectsPage() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Spotlight className="rounded-2xl mb-12">
        <div className="py-12 px-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Selected work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Projects</h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            Live products first — component libraries, AI tools, and experiments below.
          </p>
        </div>
      </Spotlight>
      <div className="flex flex-col gap-4 mb-8">
        {flagships.map((p) => (
          <ProjectCard key={p.slug} project={p} featured />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
