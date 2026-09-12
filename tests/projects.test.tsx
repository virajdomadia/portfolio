import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectSlides from '@/components/ProjectSlides'
describe('ProjectSlides', () => {
  it('renders five slides, five dots, live + source links per project', () => {
    const { container } = render(<ProjectSlides />)
    expect(container.querySelectorAll('[data-slide]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-dot]')).toHaveLength(5)
    expect(screen.getAllByRole('link', { name: /Open live/ })).toHaveLength(5)
    expect(screen.getAllByRole('link', { name: 'Source' })).toHaveLength(5)
    expect(screen.getByRole('heading', { level: 3, name: 'Smart Job Board' })).toBeInTheDocument()
  })
})
