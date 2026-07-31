import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PillNav } from '@/components/layout/nav'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('PillNav', () => {
  it('renders the 6 nav links with correct hrefs, About last', () => {
    render(<PillNav />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks[0]).toHaveAttribute('href', '/')
    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' })
    expect(projectsLinks[0]).toHaveAttribute('href', '/projects')
    const writingLinks = screen.getAllByRole('link', { name: 'Writing' })
    expect(writingLinks[0]).toHaveAttribute('href', '/writing')
    const hobbiesLinks = screen.getAllByRole('link', { name: 'Hobbies' })
    expect(hobbiesLinks[0]).toHaveAttribute('href', '/hobbies')
    const experienceLinks = screen.getAllByRole('link', { name: 'Experience' })
    expect(experienceLinks[0]).toHaveAttribute('href', '/experience')
    const aboutLinks = screen.getAllByRole('link', { name: 'About' })
    expect(aboutLinks[0]).toHaveAttribute('href', '/about')
    const desktopNav = screen.getByRole('navigation', { name: 'Main' })
    const desktopLabels = Array.from(desktopNav.querySelectorAll('a')).map((a) => a.textContent)
    expect(desktopLabels).toEqual(['Home', 'Projects', 'Writing', 'Hobbies', 'Experience', 'About'])
    expect(screen.queryByRole('link', { name: 'Contact' })).not.toBeInTheDocument()
  })

  it('hamburger button opens and closes the mobile overlay', async () => {
    const user = userEvent.setup()
    render(<PillNav />)
    const openBtn = screen.getByRole('button', { name: 'Open menu' })
    await user.click(openBtn)
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    const closeBtn = screen.getByRole('button', { name: 'Close menu' })
    await user.click(closeBtn)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
  })

  it('Escape key closes the mobile overlay', async () => {
    const user = userEvent.setup()
    render(<PillNav />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
  })
})
