import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Aurora } from '@/components/effects/aurora'
import { GlowCard } from '@/components/effects/glow-card'
import { CountUp } from '@/components/effects/count-up'
import { RotatingText } from '@/components/effects/rotating-text'
import { Spotlight } from '@/components/effects/spotlight'
import { SplitText } from '@/components/effects/split-text'

describe('Aurora', () => {
  it('renders without error', () => {
    const { container } = render(<Aurora />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe('GlowCard', () => {
  it('renders children', () => {
    render(
      <GlowCard>
        <span>content</span>
      </GlowCard>
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})

describe('CountUp', () => {
  it('renders the target value', () => {
    render(<CountUp to={200} suffix="%" />)
    expect(screen.getByText(/200/)).toBeInTheDocument()
  })
})

describe('RotatingText', () => {
  it('renders the first item', () => {
    render(<RotatingText items={['President', 'Member']} />)
    expect(screen.getByText('President')).toBeInTheDocument()
  })
})

describe('Spotlight', () => {
  it('renders children', () => {
    render(
      <Spotlight>
        <p>inner</p>
      </Spotlight>
    )
    expect(screen.getByText('inner')).toBeInTheDocument()
  })
})

describe('SplitText', () => {
  it('renders the full text accessibly', () => {
    render(<SplitText text="Hello World" />)
    // aria-label provides the full text for screen readers
    expect(screen.getByLabelText('Hello World')).toBeInTheDocument()
  })

  it('reserves descender space in word wrappers so g/y are not clipped', () => {
    const { container } = render(<SplitText text="Crawford Young" />)
    const wrappers = Array.from(container.querySelectorAll('span')).filter(
      (s) => s.style.overflow === 'hidden'
    )
    expect(wrappers.length).toBeGreaterThan(0)
    for (const w of wrappers) {
      expect(w.style.paddingBottom).toBe('0.15em')
      expect(w.style.marginBottom).toBe('-0.15em')
    }
  })
})
