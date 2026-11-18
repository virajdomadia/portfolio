import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Stack from '@/components/Stack/Stack'
import { ICONS } from '@/components/icons'
import { content } from '@/lib/content'

describe('Stack', () => {
  it('has an icon for every tool', () => { for (const t of content.tools) expect(ICONS[t.key], t.key).toBeDefined() })
  it('renders 30 pills in four labelled rows', () => {
    const { container } = render(<Stack />)
    expect(container.querySelectorAll('.tpill')).toHaveLength(30)
    // labels, not fake links: nothing in the section is focusable
    expect(container.querySelectorAll('.tpill a, a.tpill, [tabindex]')).toHaveLength(0)
    expect(screen.queryAllByRole('link')).toHaveLength(0)
    expect(screen.getByRole('heading', { level: 2, name: 'What I ship with, by layer.' })).toBeInTheDocument()
    for (const l of ['Client', 'Server', 'Data', 'Tooling']) expect(screen.getByText(l)).toBeInTheDocument()
  })
  it('every pill shows its years', () => {
    render(<Stack />)
    expect(screen.getAllByText(/\d yrs?$/)).toHaveLength(30)
  })
})
