import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComingSoon from '@/components/ComingSoon'

describe('ComingSoon', () => {
  it('keeps the projects anchor, says coming soon, names no projects, links to zapigo', () => {
    const { container } = render(<ComingSoon />)
    expect(container.querySelector('section#projects')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2, name: /Coming soon/ })).toBeInTheDocument()
    expect(container.querySelectorAll('li')).toHaveLength(0)
    expect(screen.getByRole('link', { name: /zapigo\.com/ })).toHaveAttribute('href', 'https://zapigo.com')
  })
})
