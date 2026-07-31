import type { ReactNode } from 'react'

interface PoemProps {
  readonly children: string
}

export function Poem({ children }: PoemProps): ReactNode {
  return <div className="whitespace-pre-line leading-8">{children}</div>
}
