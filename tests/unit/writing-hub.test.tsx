import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import WritingPage from '@/app/writing/page'

vi.mock('@/components/effects/spotlight', () => ({
  Spotlight: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
vi.mock('@/components/effects/glow-card', () => ({
  GlowCard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('WritingPage', () => {
  it('renders heading', () => {
    render(<WritingPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Writing')
  })

  it('renders all three collections and the story', () => {
    render(<WritingPage />)
    expect(screen.getByText('Halfway Found')).toBeInTheDocument()
    expect(screen.getByText('Almost')).toBeInTheDocument()
    expect(screen.getByText("You Can't Halfway Jump")).toBeInTheDocument()
    expect(screen.getByText('The Hiker')).toBeInTheDocument()
  })

  it('links each collection card to its writing route', () => {
    render(<WritingPage />)
    expect(screen.getByRole('link', { name: /Halfway Found/ })).toHaveAttribute(
      'href',
      '/writing/halfway-found'
    )
    expect(screen.getByRole('link', { name: /The Hiker/ })).toHaveAttribute(
      'href',
      '/writing/the-hiker'
    )
  })

  it('renders an outbound link to the Substack page itself, not the subscribe form', () => {
    render(<WritingPage />)
    const substackLink = screen.getByRole('link', { name: 'Read on Substack' })
    expect(substackLink).toHaveAttribute('href', 'https://crawfordyoung.substack.com/')
    expect(substackLink).toHaveAttribute('target', '_blank')
    expect(substackLink).toHaveAttribute('rel', 'noreferrer')
  })
})
