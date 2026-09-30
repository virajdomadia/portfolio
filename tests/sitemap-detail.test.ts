import { describe, it, expect, vi, afterEach } from 'vitest'
import sitemap from '@/app/sitemap'

afterEach(() => vi.unstubAllEnvs())

describe('sitemap', () => {
  it('lists each detail page with its updated date, OG image and gallery stills', () => {
    vi.stubEnv('PORTFOLIO_FIXTURE_DETAIL', '1')
    const e = sitemap().find((x) => x.url.endsWith('/projects/tripsmith'))!
    expect(e.priority).toBe(0.7)
    expect(new Date(e.lastModified!).toISOString().slice(0, 10)).toBe('2026-09-30')
    expect(e.images).toHaveLength(4) // OG + 3 stills (the clip contributes its poster)
    expect(e.images![0]).toMatch(/\/projects\/tripsmith\/opengraph-image$/)
  })
  it('has no project entries when no project has a detail page', () => {
    expect(sitemap().some((x) => x.url.includes('/projects/'))).toBe(false)
  })
})
