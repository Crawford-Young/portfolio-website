'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/experience', label: 'Experience' },
]

export function PillNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  useEffect(() => {
    if (open) firstLinkRef.current?.focus()
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      {/* Desktop */}
      <header className="fixed top-4 inset-x-0 z-50 hidden md:flex justify-center pointer-events-none">
        <nav
          aria-label="Main"
          className="pointer-events-auto flex items-center gap-0.5 rounded-full bg-surface/80 backdrop-blur-md border border-border px-2 py-1.5 shadow-lg shadow-black/20"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                isActive(href)
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile top bar */}
      <header className="fixed top-0 inset-x-0 z-50 flex md:hidden items-center justify-between px-5 py-4 bg-background/50 backdrop-blur-xl border-b border-border/60">
        <span className="text-sm font-bold tracking-tight">CY</span>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
          className="p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              ref={index === 0 ? firstLinkRef : undefined}
              className="text-3xl font-bold tracking-tight hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
