import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/footer'

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Crawford Young/)).toBeInTheDocument()
  })
  it('has GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Crawford-Young'
    )
  })
  it('has LinkedIn link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/crawford-young/'
    )
  })
  it('links to the privacy policy', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy')
  })
  it('links to the contact page', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
  })
  it('uses the domain contact address, not a personal inbox', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      'mailto:hello@crawfordyoung.dev'
    )
  })
})
