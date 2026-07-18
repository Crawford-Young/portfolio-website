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
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Crawford-Young'
    )
  })
  it('renders Aderant in role card', () => {
    render(<HomePage />)
    expect(screen.getAllByText(/Aderant/).length).toBeGreaterThan(0)
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
})
