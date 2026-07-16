import Link from 'next/link'
import { Card, CardContent } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { ArrowRight } from 'lucide-react'

export function HobbiesTeaserCard() {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border overflow-hidden">
        <CardContent className="p-6 flex flex-col justify-between h-full relative">
          <div
            aria-hidden="true"
            className="absolute bottom-3 right-4 text-4xl opacity-[0.08] select-none pointer-events-none leading-none"
          >
            🏔️🎸♟️🎮
          </div>
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-3">
              Outside Work
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Outdoors, instruments, chess, video games — the other side of the build.
            </p>
          </div>
          <Link
            href="/hobbies"
            aria-label="Explore hobbies"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore <ArrowRight className="h-3 w-3" />
          </Link>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
