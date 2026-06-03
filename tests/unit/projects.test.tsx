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
})
