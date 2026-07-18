import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HobbyDetailList } from '@/components/hobbies/hobby-detail-list'
import type { HobbyDetail } from '@/types'

const details: HobbyDetail[] = [
  { id: 'a', icon: 'Trophy', label: 'Lacrosse', detail: 'Played all four years of high school.' },
  {
    id: 'b',
    icon: 'Users',
    label: 'Club Volleyball',
    detail: 'Played club volleyball at Auburn for a year.',
  },
  {
    id: 'c',
    icon: 'Sword',
    label: 'Challenge Me',
    href: 'https://www.chess.com/member/carsickyak',
  },
]

describe('HobbyDetailList', () => {
  it('renders one accordion trigger per expandable detail', () => {
    render(<HobbyDetailList details={details} />)
    expect(screen.getByRole('button', { name: /lacrosse/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /club volleyball/i })).toBeInTheDocument()
  })

  it('hides detail text until its trigger is clicked', async () => {
    render(<HobbyDetailList details={details} />)
    expect(screen.queryByText('Played all four years of high school.')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /lacrosse/i }))
    expect(screen.getByText('Played all four years of high school.')).toBeVisible()
  })

  it('closes the open item when another opens (single-open)', async () => {
    render(<HobbyDetailList details={details} />)
    await userEvent.click(screen.getByRole('button', { name: /lacrosse/i }))
    await userEvent.click(screen.getByRole('button', { name: /club volleyball/i }))
    expect(screen.getByRole('button', { name: /lacrosse/i })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
    expect(screen.getByText('Played club volleyball at Auburn for a year.')).toBeVisible()
  })

  it('renders link details as external anchors, not triggers', () => {
    render(<HobbyDetailList details={details} />)
    const link = screen.getByRole('link', { name: /challenge me/i })
    expect(link).toHaveAttribute('href', 'https://www.chess.com/member/carsickyak')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders nothing accordion-shaped when all details are links', () => {
    render(<HobbyDetailList details={[details[2]]} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
