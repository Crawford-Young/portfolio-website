import type { Metadata } from 'next'
import { Separator } from '@/lib/ui'
import { WorkTimelineItem } from '@/components/experience/timeline-item'
import { EducationTimelineItem } from '@/components/experience/timeline-item'
import { workExperience, education } from '@/data/experience'

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work history and education for Crawford Young.',
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        Career &amp; education
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-3">Experience</h1>
      <p className="text-muted-foreground mb-14">
        Where I&apos;ve worked and what I&apos;ve built.
      </p>

      <section>
        <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-8">
          Work
        </p>
        {workExperience.map((item, i) => (
          <WorkTimelineItem key={item.id} item={item} isLast={i === workExperience.length - 1} />
        ))}
      </section>

      <Separator className="my-12" />

      <section>
        <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-8">
          Education
        </p>
        {education.map((item, i) => (
          <EducationTimelineItem key={item.id} item={item} isLast={i === education.length - 1} />
        ))}
      </section>
    </div>
  )
}
