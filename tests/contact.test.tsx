import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from '@/components/Contact/Contact'

describe('Contact', () => {
  it('has a tap-to-call phone link and the four quick answers', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: '+91 88280 91294' })).toHaveAttribute('href', 'tel:+918828091294')
    expect(screen.getByRole('heading', { level: 3, name: 'Quick answers' })).toBeInTheDocument()
    expect(screen.getAllByRole('term')).toHaveLength(4)
    expect(screen.getByText(/originally from Mumbai/)).toBeInTheDocument()
  })
})
