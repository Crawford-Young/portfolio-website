import { Card, CardContent } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { RotatingText } from '@/components/effects/rotating-text'
import { Users } from 'lucide-react'

const ROLES = [
  'Web Dev Club President',
  'Competitive Programmer',
  'Ethical Hacker',
  'ACM Member',
  'Honors Scholar',
]

export function CommunityCard() {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-accent" />
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em]">
              Community
            </p>
          </div>
          <div className="text-xl font-bold text-foreground tracking-tight min-h-[1.75rem]">
            <RotatingText items={ROLES} />
          </div>
          <p className="text-xs text-muted-foreground">Auburn University</p>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
