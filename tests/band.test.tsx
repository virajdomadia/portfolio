import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Band from '@/components/Band'
describe('Band', () => {
  it('renders the headline split into letters', () => {
    const { container } = render(<Band />)
    expect(container.querySelector('[data-progress="band"]')).toBeTruthy()
    expect(screen.getByText('Every project on this page is deployed and public. Code first, slides never.')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-ch]').length).toBe(18)
  })
})
