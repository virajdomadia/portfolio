import { describe, it, expect } from 'vitest'
import { content } from '@/lib/content'
import { ContentSchema } from '@/lib/content-schema'

describe('content', () => {
  it('validates against its schema', () => { expect(() => ContentSchema.parse(content)).not.toThrow() })
  it('lists the six projects, each with a live URL and a public repo', () => {
    expect(content.projects).toHaveLength(6)
    expect(content.projects.map((p) => p.slug)).toEqual(['tripsmith', 'frontrow', 'pagecraft', 'offcut', 'skillroom', 'platter'])
    for (const p of content.projects) {
      expect(p.live).toMatch(/^https:\/\/.+\.vercel\.app$/)
      expect(p.repo).toBe(`https://github.com/virajdomadia/${p.slug}`)
      expect(p.status).toMatch(/landing page live/)
    }
  })
  it('has 30 tools across four layers with honest years (≤ 2)', () => {
    expect(content.tools).toHaveLength(30)
    expect(new Set(content.tools.map(t => t.layer))).toEqual(new Set(['client', 'server', 'data', 'tooling']))
    expect(Math.max(...content.tools.map(t => t.years))).toBeLessThanOrEqual(2)
  })
  it('states the verified facts and none of the retired claims', () => {
    const text = JSON.stringify(content)
    expect(content.person.city).toBe('Bengaluru')
    expect(content.experience[0].title).toBe('Software Engineer · Zapigo')
    expect(content.experience[1].title).toBe('IT Executive · Venus Vacations Pvt. Ltd')
    expect(content.person.phone).toBe('+918828091294')
    for (const retired of ['5 apps live', 'UI libraries for Accenture', 'Full Stack Developer', 'example.com', 'Mumbai, IN']) expect(text).not.toContain(retired)
    for (const alt of [content.about.photoAlt, content.hero.bgAlt, content.band.alt]) expect(alt).toMatch(/^Illustration/)
  })
  it('has four FAQ entries that mention Bengaluru and the phone', () => {
    expect(content.faq).toHaveLength(4)
    expect(content.faq.map(f => f.a).join(' ')).toMatch(/Bengaluru/)
    expect(content.faq.map(f => f.a).join(' ')).toContain('+91 88280 91294')
  })
})
