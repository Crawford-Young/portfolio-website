import { Card, CardContent } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'

export function AboutCard() {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border">
        <CardContent className="p-6 h-full flex flex-col justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-4">
              About
            </p>
            <p className="text-sm text-muted-foreground leading-[1.7]">
              Software engineer focused on building practical products that combine modern web
              development with AI-driven workflows. Frontend-first — React, TypeScript, Next.js —
              with full-stack depth in Python/FastAPI and AWS.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            B.S. Computer Science · Auburn University · Summa Cum Laude
          </p>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
