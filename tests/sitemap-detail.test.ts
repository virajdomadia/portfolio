import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'

describe('sitemap', () => {
  it('lists each detail page with its updated date, OG image and gallery stills', () => {
    const e = sitemap().find((x) => x.url.endsWith('/projects/tripsmith'))!
    expect(e.priority).toBe(0.7)
    expect(new Date(e.lastModified!).toISOString().slice(0, 10)).toBe('2026-10-01')
    expect(e.images).toHaveLength(13) // OG + 8 stills + 4 clip posters
    expect(e.images![0]).toMatch(/\/projects\/tripsmith\/opengraph-image$/)
  })
  it('has exactly one project entry, /projects/tripsmith', () => {
    expect(sitemap().filter((x) => x.url.includes('/projects/')).map((x) => new URL(x.url).pathname)).toEqual(['/projects/tripsmith'])
  })
})
