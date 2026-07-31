import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Poem } from '@/components/writing/poem'

describe('Poem', () => {
  it('preserves line breaks via pre-line whitespace', () => {
    const { container } = render(<Poem>{'one\ntwo'}</Poem>)
    const el = container.firstElementChild
    expect(el?.textContent).toBe('one\ntwo')
    expect(el?.className).toContain('whitespace-pre-line')
  })

  it('renders as a card panel', () => {
    const { container } = render(<Poem>{'one\ntwo'}</Poem>)
    const el = container.firstElementChild
    expect(el?.className).toContain('rounded-xl')
    expect(el?.className).toContain('border')
    expect(el?.className).toContain('bg-surface/40')
  })
})
