import Image from 'next/image'
import { ArrowRight, Github } from 'lucide-react'
import { Button } from '@/lib/ui'
import { SplitText } from '@/components/effects/split-text'
import { Aurora } from '@/components/effects/aurora'

export function Hero() {
  return (
    <section className="-mt-16 md:-mt-20 relative min-h-screen overflow-hidden flex flex-col">
      <Aurora intensity="subtle" />

      {/* Fine grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Nav clearance — pushes content below the fixed nav */}
      <div className="relative z-10 shrink-0 h-16 md:h-20" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 gap-7 py-12">
        {/* Eyebrow: avatar + name + role */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-border shadow-xl shadow-black/40">
            <Image
              src="/profilePic.jpg"
              alt="Crawford Young"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium text-left">
            Crawford Young
            <span className="block text-xs text-muted-foreground/80">
              AI &amp; Software Engineer <span className="text-accent">@ Aderant</span>
            </span>
          </p>
        </div>

        {/* Pitch */}
        <h1 className="max-w-3xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-foreground leading-none">
          <SplitText text="I build AI products and developer tools." />
        </h1>

        <p className="max-w-md text-sm md:text-base text-muted-foreground/80 leading-relaxed">
          Shipped, tested, and live — from an AI scheduling advisor to a published component
          library.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="https://cybond.crawfordyoung.dev" target="_blank" rel="noreferrer">
              Try Cybond <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="https://github.com/Crawford-Young" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
