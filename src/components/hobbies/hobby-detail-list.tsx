'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/ui'
import {
  Trophy,
  Users,
  Waves,
  TreePine,
  Music,
  Guitar,
  Sparkles,
  BarChart2,
  Sword,
  Rocket,
  Crosshair,
  Shield,
  Gamepad2,
  Mic2,
  BookOpen,
  Feather,
  Quote,
  PenLine,
  ExternalLink,
} from 'lucide-react'
import type { HobbyDetail } from '@/types'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Users,
  Waves,
  TreePine,
  Music,
  Guitar,
  Sparkles,
  BarChart2,
  Sword,
  Rocket,
  Crosshair,
  Shield,
  Gamepad2,
  Mic2,
  BookOpen,
  Feather,
  Quote,
  PenLine,
}

export function HobbyDetailList({
  details,
}: {
  details: readonly HobbyDetail[]
}): React.JSX.Element {
  const expandable = details.filter((d) => !d.href)
  const links = details.filter((d) => d.href)

  return (
    <div>
      {expandable.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {expandable.map((d) => {
            const Icon = ICONS[d.icon] ?? Music
            return (
              <AccordionItem key={d.id} value={d.id} className="border-border/50">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    {d.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {d.detail}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((d) => {
            const Icon = ICONS[d.icon] ?? Music
            return (
              <a
                key={d.id}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-surface/60 px-3 py-2 text-sm transition-colors hover:border-border"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span>{d.label}</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/60" />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
