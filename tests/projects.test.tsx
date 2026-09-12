import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectSlides from '@/components/ProjectSlides'

describe('ProjectSlides', () => {
  it('renders six slides and dots, with live + source links and an honest status on each', () => {
    const { container } = render(<ProjectSlides />)
    expect(container.querySelector('section#projects')).toBeTruthy()
    expect(container.querySelectorAll('[data-slide]')).toHaveLength(6)
    expect(container.querySelectorAll('[data-dot]')).toHaveLength(6)
    expect(screen.getAllByRole('link', { name: /Open live/ })).toHaveLength(6)
    expect(screen.getAllByRole('link', { name: 'Source' })).toHaveLength(6)
    expect(screen.getByRole('heading', { level: 3, name: 'Tripsmith' })).toBeInTheDocument()
    expect(screen.getAllByText(/In build · landing page live/)).toHaveLength(6)
    expect(screen.getByRole('link', { name: 'All repos on GitHub' })).toHaveAttribute('href', 'https://github.com/virajdomadia')
  })
})
