import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from '@/components/Projects/Projects'

describe('Projects', () => {
  it('renders six case rows, each with a framed screenshot, live + source links and an honest status', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('section#projects')).toBeTruthy()
    expect(container.querySelectorAll('section#projects article')).toHaveLength(6)
    expect(screen.getAllByRole('img', { name: /^Screenshot of / })).toHaveLength(6)
    expect(screen.getByText('tripsmith.virajdomadia.com')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Open live/ })).toHaveLength(6)
    expect(screen.getAllByRole('link', { name: 'Source' })).toHaveLength(6)
    expect(screen.getByRole('heading', { level: 3, name: 'Tripsmith' })).toBeInTheDocument()
    expect(screen.queryByText(/In build/)).toBeNull()
    expect(screen.getAllByText(/· Live$/)).toHaveLength(5)
    expect(screen.getByText(/v2 live · bookings \+ payments/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All repos on GitHub' })).toHaveAttribute('href', 'https://github.com/virajdomadia')
  })
  it('only Tripsmith has a detail page: "View project →" and a linked title; the others do not', () => {
    render(<Projects />)
    const links = screen.getAllByRole('link', { name: 'View project →' })
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', '/projects/tripsmith')
    expect(screen.getByRole('link', { name: 'Tripsmith' })).toHaveAttribute('href', '/projects/tripsmith')
    expect(screen.queryByRole('link', { name: 'Frontrow' })).toBeNull()
  })
})
