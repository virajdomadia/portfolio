import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Marquee from '@/components/Marquee'
describe('Marquee', () => {
  it('renders two bands, each with its items duplicated for a seamless loop', () => {
    const { container } = render(<Marquee />)
    const bands = container.querySelectorAll('[data-skew]')
    expect(bands).toHaveLength(2)
    expect(bands[0].textContent?.split('React').length - 1).toBe(2)
  })
})
