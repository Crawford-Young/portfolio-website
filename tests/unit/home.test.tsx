import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

vi.mock('next/image', () => ({
  default: ({
    alt,
    fill,
    priority,
    ...props
  }: {
    alt: string
    fill?: boolean
    priority?: boolean
    [key: string]: unknown
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} data-fill={fill} data-priority={priority} {...props} />
  ),
}))
vi.mock('@/components/effects/aurora', () => ({ Aurora: () => null }))
vi.mock('@/components/effects/split-text', () => ({
  SplitText: ({ text }: { text: string }) => <span>{text}</span>,
}))
vi.mock('@/components/effects/glow-card', () => ({
  GlowCard: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
vi.mock('@/components/effects/rotating-text', () => ({
  RotatingText: ({ items }: { items: string[] }) => <span>{items[0]}</span>,
}))
vi.mock('@/components/home/github-stats-card', () => ({
  GitHubStatsCard: () => <div data-testid="github-stats-card" />,
}))

describe('HomePage', () => {
  it('renders hero name', () => {
    render(<HomePage />)
    expect(screen.getByText('Crawford Young')).toBeInTheDocument()
  })
  it('hero leads with the product pitch', () => {
    render(<HomePage />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'I build AI products and developer tools.' })
    ).toBeInTheDocument()
  })
  it('hero keeps name and role as eyebrow', () => {
    render(<HomePage />)
    expect(screen.getByText(/Crawford Young/)).toBeInTheDocument()
    expect(screen.getByText(/AI & Software Engineer/)).toBeInTheDocument()
  })
  it('hero has Cybond and GitHub CTAs', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /try cybond/i })).toHaveAttribute(
      'href',
      'https://cybond.crawfordyoung.dev'
    )
    const githubProfileLink = screen
      .getAllByRole('link', { name: /github/i })
      .find((link) => link.getAttribute('href') === 'https://github.com/Crawford-Young')
    expect(githubProfileLink).toBeInTheDocument()
  })
  it('has contact email link', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute(
      'href',
      'mailto:crawfordyoung248@gmail.com'
    )
  })
  it('has link to hobbies', () => {
    render(<HomePage />)
    expect(screen.getByRole('link', { name: /explore/i })).toHaveAttribute('href', '/hobbies')
  })
  it('renders profile image', () => {
    render(<HomePage />)
    expect(screen.getByAltText('Crawford Young')).toBeInTheDocument()
  })
  it('renders all three flagship sections', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: 'Cybond' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '@crawfordyoung/ui Component Library' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Cy's Music" })).toBeInTheDocument()
  })
  it('renders non-flagship projects in the More projects grid', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { name: /more projects/i })).toBeInTheDocument()
    expect(screen.getByText('Chess Puzzle Generator')).toBeInTheDocument()
  })
  it('keeps the contact anchor for nav', () => {
    const { container } = render(<HomePage />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })
})
