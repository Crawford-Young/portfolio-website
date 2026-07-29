import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactPage from '@/app/contact/page'

describe('ContactPage', () => {
  it('renders the contact heading', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { name: /contact/i, level: 1 })).toBeInTheDocument()
  })

  it('exposes a mailto link', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: /hello@crawfordyoung\.dev/i })).toHaveAttribute(
      'href',
      'mailto:hello@crawfordyoung.dev'
    )
  })

  it('links to GitHub and LinkedIn', () => {
    render(<ContactPage />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/Crawford-Young'
    )
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/crawford-young/'
    )
  })
})
