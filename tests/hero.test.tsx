import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the name as an h1 split into letters, CTAs and stats', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(/Viraj\s*Domadia/)
    expect(h1.querySelectorAll('[data-ch]').length).toBe(12)
    expect(screen.getByRole('link', { name: 'See the projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Hire me' })).toHaveAttribute('href', '#contact')
    expect(screen.getByText('apps live')).toBeInTheDocument()
  })
})
