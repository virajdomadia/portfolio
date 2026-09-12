import { describe, it, expect } from 'vitest'
import { jsonLdGraph, breadcrumbs } from '@/lib/seo'
import { content } from '@/lib/content'

const byType = (t: string) => jsonLdGraph()['@graph'].find((n: any) => n['@type'] === t) as any

describe('JSON-LD', () => {
  it('is valid JSON with Person, WebSite, ProfilePage and FAQPage', () => {
    const g = jsonLdGraph(); expect(() => JSON.parse(JSON.stringify(g))).not.toThrow()
    for (const t of ['Person', 'WebSite', 'ProfilePage', 'FAQPage']) expect(byType(t)).toBeTruthy()
  })
  it('Person carries the verified facts', () => {
    const p = byType('Person')
    expect(p['@id']).toMatch(/#person$/)
    expect(p.homeLocation.address.addressLocality).toBe('Bengaluru')
    expect(p.birthPlace.address.addressLocality).toBe('Mumbai')
    expect(p.worksFor.name).toBe('Zapigo')
    expect(p.telephone).toBe(content.person.phone)
    expect(p.knowsAbout).toContain('FastAPI')
    expect(p.alumniOf.map((a: any) => a.name)).toContain('Amity University')
    expect(p.sameAs).toEqual(content.seo.sameAs)
  })
  it('FAQPage mirrors the visible FAQ exactly', () => {
    const f = byType('FAQPage')
    expect(f.mainEntity.map((q: any) => q.name)).toEqual(content.faq.map((x) => x.q))
    expect(f.mainEntity.map((q: any) => q.acceptedAnswer.text)).toEqual(content.faq.map((x) => x.a))
  })
  it('ids resolve within the graph', () => {
    const g = jsonLdGraph()['@graph'] as any[]; const ids = new Set(g.map((n) => n['@id']))
    expect(ids.has(byType('ProfilePage').mainEntity['@id'])).toBe(true)
    expect(ids.has(byType('WebSite').publisher['@id'])).toBe(true)
  })
  it('breadcrumbs number from 1 with absolute urls', () => {
    const b = breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])
    expect(b.itemListElement[1]).toMatchObject({ position: 2, item: expect.stringMatching(/\/projects$/) })
  })
})
