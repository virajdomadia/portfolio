import { describe, it, expect } from 'vitest'
import { guides, getGuide } from '@/lib/guides'

describe('guides', () => {
  it('have unique, url-safe slugs and resolve by slug', () => {
    const slugs = guides.map((g) => g.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) { expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/); expect(getGuide(s)?.slug).toBe(s) }
  })
  it('each has a search-sized title and description, a valid date and real content', () => {
    for (const g of guides) {
      expect(g.title.length, g.slug).toBeLessThanOrEqual(90)
      expect(g.description.length, g.slug).toBeGreaterThanOrEqual(80)
      expect(g.description.length, g.slug).toBeLessThanOrEqual(260)
      expect(Number.isNaN(new Date(g.updated).getTime()), g.slug).toBe(false)
      expect(g.sections.length, g.slug).toBeGreaterThanOrEqual(4)
    }
  })
})
