import { Badge } from '@/lib/ui'
import { CountUp } from '@/components/effects/count-up'
import { cn } from '@/lib/utils'
import type { WorkExperience, Education } from '@/types'

export function WorkTimelineItem({
  item,
  isLast = false,
}: {
  item: WorkExperience
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1.5 ring-4 ring-background" />
        {!isLast && <div className="w-px flex-1 bg-border mt-2 min-h-[2rem]" />}
      </div>
      <div className={cn('flex-1', isLast ? 'pb-0' : 'pb-10')}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-bold text-foreground tracking-tight">{item.company}</h3>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge variant="secondary" className="text-xs">
              {item.type}
            </Badge>
            <span className="text-xs text-muted-foreground">{item.period}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
        {item.stats && (
          <div className="rounded-lg border border-border/30 bg-surface/30 px-4 py-3 inline-flex gap-8 mt-4 mb-3">
            {item.stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-accent">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        )}
        {item.bullets && (
          <ul className="mt-3 space-y-2">
            {item.bullets.map((b, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                <span className="text-accent mt-1.5 shrink-0 leading-none">–</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function EducationTimelineItem({
  item,
  isLast = false,
}: {
  item: Education
  isLast?: boolean
}) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-border shrink-0 mt-1.5 ring-4 ring-background" />
        {!isLast && <div className="w-px flex-1 bg-border mt-2 min-h-[2rem]" />}
      </div>
      <div className={cn('flex-1', isLast ? 'pb-0' : 'pb-10')}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-semibold text-foreground tracking-tight">{item.institution}</h3>
            <p className="text-sm text-muted-foreground">{item.degree}</p>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{item.period}</span>
        </div>
        {item.achievements && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.achievements.map((a) => (
              <Badge key={a} variant="outline" className="text-xs">
                {a}
              </Badge>
            ))}
          </div>
        )}
        {item.activities && (
          <ul className="mt-3 space-y-1">
            {item.activities.map((a) => (
              <li key={a} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-accent">–</span> {a}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
