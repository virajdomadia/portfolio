import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectDetail from '@/components/ProjectDetail/ProjectDetail'
import { content } from '@/lib/content'
import { fixtureDetail } from '@/lib/fixtures/detail'
import type { DetailProject } from '@/lib/projects'

const p: DetailProject = { ...content.projects[0], detail: fixtureDetail }

describe('ProjectDetail', () => {
  it('renders breadcrumb, h1, facts, CTAs, case study, versions and walkthrough', () => {
    render(<ProjectDetail p={p} />)
    const crumbs = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(crumbs).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(within(crumbs).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects')
    expect(screen.getByRole('heading', { level: 1, name: 'Tripsmith' })).toBeInTheDocument()
    expect(screen.getByText(fixtureDetail.pitch)).toBeInTheDocument()
    for (const dt of ['Role', 'Year', 'Status', 'Version']) expect(screen.getByText(dt, { selector: 'dt' })).toBeInTheDocument()
    expect(screen.getByText(p.status, { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Open live ↗' })).toHaveAttribute('href', p.live)
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute('href', p.repo)
    for (const h of ['The problem', 'What I built', 'Key decisions', 'Versions', 'Outcome']) expect(screen.getByRole('heading', { level: 2, name: h })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
    expect(screen.getByText('Next', { selector: '[data-state="next"] span' })).toBeInTheDocument()
    expect(screen.getByText('30 September 2026').closest('time')).toHaveAttribute('datetime', '2026-09-30')
    expect(screen.getByRole('button', { name: 'Play the Tripsmith walkthrough video' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '← All projects' })).toHaveAttribute('href', '/#project-tripsmith')
  })
  it('omits the walkthrough when there is none', () => {
    render(<ProjectDetail p={{ ...p, detail: { ...fixtureDetail, walkthrough: undefined } }} />)
    expect(screen.queryByRole('heading', { name: 'Walkthrough' })).toBeNull()
  })
})
