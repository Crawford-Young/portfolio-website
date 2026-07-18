import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FlagshipSection } from '@/components/home/flagship-section'
import type { Project } from '@/types'

const project: Project = {
  slug: 'cybond',
  title: 'Cybond',
  description: 'desc',
  tech: ['Next.js', 'AI SDK'],
  url: 'https://cybond.crawfordyoung.dev',
  flagship: true,
  pitch: 'An AI scheduling advisor.',
  ctaLabel: 'Try it live',
  screenshot: '/screenshots/cybond.png',
}

describe('FlagshipSection', () => {
  it('renders title, pitch, and screenshot', () => {
    render(<FlagshipSection project={project} />)
    expect(screen.getByRole('heading', { name: 'Cybond' })).toBeInTheDocument()
    expect(screen.getByText('An AI scheduling advisor.')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /cybond screenshot/i })).toBeInTheDocument()
  })

  it('renders tech badges', () => {
    render(<FlagshipSection project={project} />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('AI SDK')).toBeInTheDocument()
  })

  it('primary CTA uses ctaLabel and live url', () => {
    render(<FlagshipSection project={project} />)
    expect(screen.getByRole('link', { name: /try it live/i })).toHaveAttribute(
      'href',
      'https://cybond.crawfordyoung.dev'
    )
  })

  it('renders repo and npm CTAs only when present', () => {
    render(<FlagshipSection project={project} />)
    expect(screen.queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
    render(
      <FlagshipSection
        project={{ ...project, repo: 'https://github.com/x/y', npm: 'https://npmjs.com/p' }}
      />
    )
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/x/y'
    )
    expect(screen.getByRole('link', { name: /npm/i })).toHaveAttribute(
      'href',
      'https://npmjs.com/p'
    )
  })
})
