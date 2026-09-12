import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MobileMenu from '@/components/MobileMenu'

describe('MobileMenu', () => {
  it('opens, locks scroll, lists the four sections, closes on link and Escape', () => {
    render(<MobileMenu />)
    const burger = screen.getByRole('button', { name: 'Open menu' })
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(burger)
    expect(document.documentElement).toHaveClass('menu-open')
    expect(burger).toHaveAttribute('aria-expanded', 'true')
    for (const s of ['About', 'Projects', 'Stack', 'Contact']) expect(screen.getByRole('link', { name: new RegExp(s) })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /Projects/ }))
    expect(document.documentElement).not.toHaveClass('menu-open')
    fireEvent.click(burger)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(document.documentElement).not.toHaveClass('menu-open')
  })
})
