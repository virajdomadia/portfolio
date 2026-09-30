import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Walkthrough from '@/components/ProjectDetail/Walkthrough'

describe('Walkthrough', () => {
  it('shows only a thumbnail until clicked, then a privacy-mode iframe', async () => {
    const { container } = render(<Walkthrough id="M7lc1UVf-VE" title="Demo" />)
    expect(container.querySelector('iframe')).toBeNull()
    await userEvent.setup().click(screen.getByRole('button', { name: 'Play the Demo walkthrough video' }))
    const f = screen.getByTitle('Demo walkthrough video')
    expect(f.getAttribute('src')).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/M7lc1UVf-VE\?/)
  })
})
