import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Nav from '@/components/Nav'

vi.mock('next/navigation', () => ({ usePathname: () => '/' }))

describe('Nav', () => {
  it('renders brand, section links, availability and Hire me', () => {
    render(<Nav />)
    // the name contains the visible "VD" (Lighthouse label-content-name-mismatch)
    expect(screen.getByRole('link', { name: 'VD Viraj Domadia' })).toHaveAttribute('href', '/#top')
    for (const s of ['About', 'Projects', 'Stack', 'Contact']) expect(screen.getByRole('link', { name: s })).toHaveAttribute('href', `/#${s.toLowerCase()}`)
    expect(screen.getByText('Available · 2026')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hire me' })).toHaveAttribute('href', '/#contact')
  })
})
