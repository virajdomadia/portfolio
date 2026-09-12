import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Band from '@/components/Band'
import { content } from '@/lib/content'
describe('Band', () => {
  it('renders the headline split into letters', () => {
    const { container } = render(<Band />)
    expect(container.querySelector('[data-progress="band"]')).toBeTruthy()
    expect(screen.getByText(content.band.sub)).toBeInTheDocument()
    expect(container.querySelectorAll('[data-ch]').length).toBe(18)
  })
})
