import { describe, it, expect, vi } from 'vitest'
// next/font needs the Next compiler; the layout's fonts are irrelevant to the metadata under test
vi.mock('next/font/google', () => { const f = () => ({ variable: 'x', className: 'x' }); return { Anybody: f, Instrument_Sans: f, IBM_Plex_Mono: f } })
import { metadata } from '@/app/layout'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import manifest from '@/app/manifest'

describe('crawl surface', () => {
  it('metadata has canonical, OG url/locale, keywords and robots directives', () => {
    expect(metadata.alternates?.canonical).toBe('/')
    expect((metadata.openGraph as any).locale).toBe('en_IN')
    expect(metadata.keywords).toContain('Viraj Domadia')
    expect((metadata.robots as any).googleBot['max-image-preview']).toBe('large')
    expect(JSON.stringify(metadata.title)).toMatch(/Bengaluru/)
  })
  it('robots allows AI crawlers and points at the sitemap', () => {
    const r = robots(); const rules = Array.isArray(r.rules) ? r.rules : [r.rules]
    const agents = rules.flatMap((x) => (Array.isArray(x.userAgent) ? x.userAgent : [x.userAgent]))
    for (const a of ['*', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) expect(agents).toContain(a)
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/)
    expect(JSON.stringify(rules)).toContain('/api/')
  })
  it('sitemap lists home, llms.txt and the résumé', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls[0]).toMatch(/^https:\/\/.+\/$/)
    expect(urls.some((u) => u.endsWith('/llms.txt'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/Viraj-Domadia-Resume.pdf'))).toBe(true)
  })
  it('manifest is branded', () => { const m = manifest(); expect(m.theme_color).toBe('#F7E6A2'); expect(m.name).toBe('Viraj Domadia') })
})
