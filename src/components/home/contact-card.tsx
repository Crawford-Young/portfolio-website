import { Card, CardContent, Button } from '@/lib/ui'
import { GlowCard } from '@/components/effects/glow-card'
import { Mail, Linkedin } from 'lucide-react'

export function ContactCard() {
  return (
    <GlowCard className="h-full">
      <Card className="h-full bg-surface border-border">
        <CardContent className="p-6 flex flex-col gap-4">
          <p className="text-[10px] font-semibold text-accent uppercase tracking-[0.15em]">
            Get in touch
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            <Button asChild variant="default" size="sm" className="w-full justify-start gap-2">
              <a href="mailto:crawfordyoung248@gmail.com">
                <Mail className="h-4 w-4" /> Email me
              </a>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
              <a
                href="https://www.linkedin.com/in/crawford-young/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </GlowCard>
  )
}
