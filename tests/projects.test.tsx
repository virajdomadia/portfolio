import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Projects from '@/components/Projects/Projects'

describe('Projects', () => {
  it('renders six case rows, each with a framed screenshot, live + source links and an honest status', () => {
    const { container } = render(<Projects />)
    expect(container.querySelector('section#projects')).toBeTruthy()
    expect(container.querySelectorAll('section#projects article')).toHaveLength(6)
    expect(screen.getAllByRole('img', { name: /Screenshot of the .* landing page/ })).toHaveLength(6)
    expect(screen.getByText('tripsmith.vercel.app')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Open live/ })).toHaveLength(6)
    expect(screen.getAllByRole('link', { name: 'Source' })).toHaveLength(6)
    expect(screen.getByRole('heading', { level: 3, name: 'Tripsmith' })).toBeInTheDocument()
    expect(screen.getAllByText(/In build · landing page live/)).toHaveLength(5)
    expect(screen.getByText(/v2 live · bookings \+ payments/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All repos on GitHub' })).toHaveAttribute('href', 'https://github.com/virajdomadia')
  })
})
