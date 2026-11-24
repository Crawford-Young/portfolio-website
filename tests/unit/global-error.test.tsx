import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/app/globals.css', () => ({}))
import GlobalError from '@/app/global-error'

function makeError(): Error & { digest?: string } {
  return Object.assign(new Error('boom'), { digest: 'abc123' })
}

describe('GlobalError', () => {
  it('renders fallback with home link', () => {
    const error = makeError()
    render(<GlobalError error={error} reset={() => {}} />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute('href', '/')
  })

  it('invokes reset on retry click', () => {
    const reset = vi.fn()
    render(<GlobalError error={makeError()} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(reset).toHaveBeenCalledOnce()
  })
})
