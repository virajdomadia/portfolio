import fs from 'node:fs'
import { describe, it, expect } from 'vitest'
import { DetailSchema, ContentSchema } from '@/lib/content-schema'
import { fixtureDetail } from '@/lib/fixtures/detail'
import { content } from '@/lib/content'
import { allProjects, detailProjects, getDetailProject } from '@/lib/projects'

const img = (n: number) => ({ kind: 'image' as const, src: `/projects/x/${n}.webp`, alt: 'A screenshot of the product page', caption: `Image ${n}` })
const clip = (n: number) => ({ kind: 'clip' as const, webm: `/projects/x/${n}.webm`, mp4: `/projects/x/${n}.mp4`, poster: `/projects/x/${n}.jpg`, seconds: 8, alt: 'A clip of the checkout flow', caption: `Clip ${n}` })
const withMedia = (media: unknown[]) => ({ ...fixtureDetail, media })


describe('detail schema', () => {
  it('accepts the fixture', () => { expect(DetailSchema.safeParse(fixtureDetail).success).toBe(true) })
  it.each([
    ['one image', [img(1)]],
    ['images only', [img(1), img(2), img(3), img(4)]],
    ['one clip only', [clip(1)]],
    ['clips only', [clip(1), clip(2)]],
    ['mixed, clip first', [clip(1), img(1), clip(2)]],
    ['twenty items', Array.from({ length: 20 }, (_, i) => (i % 2 ? clip(i) : img(i)))],
  ])('accepts media: %s', (_, media) => { expect(DetailSchema.safeParse(withMedia(media)).success).toBe(true) })
  it.each([
    ['empty media', withMedia([])],
    ['short alt', withMedia([{ ...img(1), alt: 'shot' }])],
    ['clip without poster', withMedia([{ ...clip(1), poster: undefined }])],
    ['clip longer than 30 s', withMedia([{ ...clip(1), seconds: 45 }])],
    ['media outside /projects/', withMedia([{ ...img(1), src: '/images/x.webp' }])],
    ['bad YouTube id', { ...fixtureDetail, walkthrough: 'not-an-id' }],
    ['bad updated date', { ...fixtureDetail, updated: '30/09/2026' }],
    ['two decisions', { ...fixtureDetail, sections: { ...fixtureDetail.sections, decisions: fixtureDetail.sections.decisions.slice(0, 2) } }],
  ])('rejects %s', (_, d) => { expect(DetailSchema.safeParse(d).success).toBe(false) })
  it('whole content still validates', () => { expect(() => ContentSchema.parse(content)).not.toThrow() })
})

describe('project helpers', () => {
  it('only Tripsmith has a detail page, straight from content', () => {
    expect(allProjects()).toHaveLength(6)
    expect(detailProjects().map((p) => p.slug)).toEqual(['tripsmith'])
    expect(getDetailProject('tripsmith')?.detail).toBe(content.projects.find((p) => p.slug === 'tripsmith')?.detail)
    expect(getDetailProject('frontrow')).toBeUndefined()
  })
  it('every media file a detail block names is committed under public/', () => {
    const paths = detailProjects().flatMap((p) => p.detail.media.flatMap((m) => (m.kind === 'image' ? [m.src] : [m.webm, m.mp4, m.poster])))
    expect(paths.filter((f) => !fs.existsSync(`public${f}`))).toEqual([])
  })
})
