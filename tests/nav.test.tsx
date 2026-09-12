import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Nav from '@/components/Nav'

describe('Nav', () => {
  it('renders brand, section links, availability and Hire me', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /Viraj Domadia/ })).toHaveAttribute('href', '#top')
    for (const s of ['About', 'Projects', 'Stack', 'Contact']) expect(screen.getByRole('link', { name: s })).toHaveAttribute('href', `#${s.toLowerCase()}`)
    expect(screen.getByText('Available · 2026')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hire me' })).toHaveAttribute('href', '#contact')
  })
})
