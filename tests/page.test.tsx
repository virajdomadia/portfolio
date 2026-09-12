import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Page from '@/app/page'
describe('Page', () => {
  it('renders every section in order with landmarks', () => {
    const { container } = render(<Page />)
    const ids = Array.from(container.querySelectorAll('section[id]')).map((s) => s.id)
    expect(ids).toEqual(['about', 'projects', 'stack', 'contact'])
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(container.querySelector('script[type="application/ld+json"]')).toBeTruthy()
  })
})
