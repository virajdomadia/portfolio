import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { PDFDocument } from 'pdf-lib'
import { content } from '@/lib/content'

describe('generated files', () => {
  const txt = fs.readFileSync('public/llms.txt', 'utf8')
  it('llms.txt starts with the name and carries bio, employer, contact and the six projects', () => {
    expect(txt.startsWith('# Viraj Domadia')).toBe(true)
    expect(txt).toContain(content.person.bio)
    expect(txt).toContain('zapigo.com')
    expect(txt).toContain(content.person.email)
    for (const p of content.projects) { expect(txt).toContain(p.live); expect(txt).toContain(p.repo) }
    expect(txt).not.toContain('Mumbai, IN')
  })
  it('résumé PDF is real and one page of actual content', async () => {
    const pdf = fs.readFileSync('public/Viraj-Domadia-Resume.pdf')
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-')
    expect(pdf.length).toBeGreaterThan(2_000)
    expect((await PDFDocument.load(new Uint8Array(pdf))).getPageCount()).toBe(1)
  })
})
