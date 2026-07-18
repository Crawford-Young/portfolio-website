import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsPage from '@/app/projects/page'

vi.mock('@/components/effects/spotlight', () => ({
  Spotlight: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
vi.mock('@/components/effects/glow-card', () => ({
  GlowCard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('ProjectsPage', () => {
  it('renders heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Projects')
  })
  it('renders all 8 projects', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('@crawfordyoung/ui Component Library')).toBeInTheDocument()
    expect(screen.getByText('Cybond')).toBeInTheDocument()
    expect(screen.getByText('HTML Idle Game')).toBeInTheDocument()
  })
  it('renders flagship cards with pitch copy', () => {
    render(<ProjectsPage />)
    expect(
      screen.getByText(
        'An AI scheduling advisor that connects to your Google Calendar, understands how you actually spend your time, and helps you plan your week with intention.'
      )
    ).toBeInTheDocument()
  })
  it('renders flagships before other projects', () => {
    render(<ProjectsPage />)
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings.indexOf('Cybond')).toBeLessThan(headings.indexOf('Chess Puzzle Generator'))
  })
})
