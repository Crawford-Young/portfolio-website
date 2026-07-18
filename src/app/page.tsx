import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { FlagshipSection } from '@/components/home/flagship-section'
import { ProjectCard } from '@/components/projects/project-card'
import { BentoGrid, BentoCell } from '@/components/home/bento-grid'
import { AboutCard } from '@/components/home/about-card'
import { HobbiesTeaserCard } from '@/components/home/hobbies-teaser-card'
import { ContactCard } from '@/components/home/contact-card'
import { GitHubStatsCard } from '@/components/home/github-stats-card'
import { projects } from '@/data/projects'

export default function HomePage() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-5xl px-6 pb-16 flex flex-col gap-20">
        {/* Flagship showcases */}
        <div className="flex flex-col gap-16 md:gap-24">
          {flagships.map((p, i) => (
            <FlagshipSection key={p.slug} project={p} reverse={i % 2 === 1} />
          ))}
        </div>

        {/* Other projects */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-6">More projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* The builder — person strip */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-6">About the builder</h2>
          <BentoGrid>
            <BentoCell span="wide">
              <AboutCard />
            </BentoCell>
            <BentoCell>
              <HobbiesTeaserCard />
            </BentoCell>
            <BentoCell>
              <GitHubStatsCard />
            </BentoCell>
            <BentoCell span="wide" id="contact">
              <ContactCard />
            </BentoCell>
          </BentoGrid>
        </section>
      </div>
    </>
  )
}
