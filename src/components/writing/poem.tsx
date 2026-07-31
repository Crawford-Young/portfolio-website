import type { ReactNode } from 'react'

interface PoemProps {
  readonly children: string
}

export function Poem({ children }: PoemProps): ReactNode {
  return (
    <div className="whitespace-pre-line leading-8 rounded-xl border border-border/60 bg-surface/40 p-6 md:p-8 my-8 text-foreground">
      {children}
    </div>
  )
}
