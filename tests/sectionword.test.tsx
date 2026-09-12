import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SectionWord from '@/components/SectionWord'
describe('SectionWord', () => {
  it('wraps the bold fragment and is hidden from AT', () => {
    const { container } = render(<SectionWord text="Projects" bold="jects" />)
    const el = container.querySelector('.big')!
    expect(el.innerHTML).toBe('Pro<b>jects</b>')
    expect(el).toHaveAttribute('aria-hidden', 'true')
    expect(el).toHaveAttribute('data-progress', 'view')
    expect(el.getAttribute('style')).toContain('--chars: 8')
  })
})
