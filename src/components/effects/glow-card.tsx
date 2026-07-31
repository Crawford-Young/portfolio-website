'use client'

import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/motion'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      ref.current.style.setProperty('--gx', `${e.clientX - rect.left}px`)
      ref.current.style.setProperty('--gy', `${e.clientY - rect.top}px`)
    },
    [reduced]
  )

  const onMouseLeave = useCallback(() => {
    ref.current?.style.removeProperty('--gx')
    ref.current?.style.removeProperty('--gy')
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('relative group rounded-xl', className)}
      style={{ '--gx': '50%', '--gy': '50%' } as React.CSSProperties}
    >
      {!reduced && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              'radial-gradient(280px circle at var(--gx) var(--gy), rgba(16,185,129,0.13), transparent 70%)',
          }}
        />
      )}
      {children}
    </div>
  )
}
