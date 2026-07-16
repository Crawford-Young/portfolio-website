import { Card, CardContent, Badge } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { Building2 } from 'lucide-react'

export function RoleCard() {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em]">
              Currently
            </p>
            <Badge variant="secondary" className="text-xs">
              Full-time
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-raised flex items-center justify-center border border-border shrink-0">
              <Building2 className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Aderant</p>
              <p className="text-xs text-muted-foreground">Associate Software Engineer</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Atlanta, GA · Hybrid · Dec 2025 – Present</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Building AI-powered features and frontend systems for legal practice management
            software.
          </p>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
