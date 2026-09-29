import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import About from '@/components/About/About'
import Counters from '@/components/About/Counters'

describe('About', () => {
  it('splits the quote into indexed words and bolds the two names', () => {
    const { container } = render(<About />)
    const q = container.querySelector('blockquote')!
    expect(q.querySelectorAll('.w').length).toBeGreaterThan(15)
    expect(q.querySelectorAll('b').length).toBe(2)
    expect(q.getAttribute('style')).toContain('--n')
  })
  it('renders three experience cards with indices and the section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
    expect(screen.getAllByText(/^0[1-3]$/)).toHaveLength(3)
  })
  it('counts up to the target when revealed', () => {
    vi.useFakeTimers()
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16))
    const { container } = render(<Counters />)
    const n = container.querySelector('[data-count="30"]')!
    expect(n.textContent).toBe('0')
    act(() => { (n.closest('[data-reveal]') as any).__reveal?.() })
    act(() => { vi.advanceTimersByTime(1500) })
    expect(n.textContent).toBe('30')
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })
})

describe('About copy', () => {
  it('shows Zapigo first, only jobs as cards, and both degrees under Education', () => {
    render(<About />)
    const cards = screen.getAllByRole('article')
    expect(cards[0]).toHaveTextContent('Software Engineer · Zapigo')
    expect(cards).toHaveLength(3)
    for (const c of cards) expect(c).not.toHaveTextContent(/MCA|B\.Sc/)
    const edu = screen.getByRole('heading', { level: 3, name: 'Education' }).parentElement!
    expect(edu).toHaveTextContent('Master of Computer Applications')
    expect(edu).toHaveTextContent('8.33 CGPA')
    expect(screen.getByRole('link', { name: /Zapigo/ })).toHaveAttribute('href', 'https://zapigo.com')
  })
})
