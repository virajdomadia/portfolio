// Generates public/Viraj-Domadia-Resume.pdf from lib/content.ts. Run: pnpm gen:resume (commit the PDF).
import fs from 'node:fs'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { content as c } from '../lib/content.ts'

const ink = rgb(0.12, 0.11, 0.06), acc = rgb(0.11, 0.23, 1), muted = rgb(0.42, 0.4, 0.33)
const doc = await PDFDocument.create()
const page = doc.addPage([595.28, 841.89]) // A4
const font = await doc.embedFont(StandardFonts.Helvetica), bold = await doc.embedFont(StandardFonts.HelveticaBold)
const M = 48, W = 595.28 - M * 2
let y = 841.89 - M
// Standard fonts are WinAnsi: swap the few typographic characters the copy uses
const ascii = (t) => t.replace(/→/g, '->').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/—/g, '-').replace(/–/g, '-').replace(/·/g, '|')
const text = (t, { size = 10, f = font, color = ink, x = M } = {}) => { page.drawText(ascii(t), { x, y, size, font: f, color }); y -= size * 1.35 }
const wrap = (t, size, f = font, width = W) => { const words = ascii(t).split(' '), out = []; let line = ''; for (const w of words) { const test = line ? `${line} ${w}` : w; if (f.widthOfTextAtSize(test, size) > width) { out.push(line); line = w } else line = test } if (line) out.push(line); return out }
const para = (t, opts = {}) => { for (const l of wrap(t, opts.size ?? 10, opts.f ?? font)) text(l, opts) }
const rule = () => { y -= 4; page.drawLine({ start: { x: M, y }, end: { x: M + W, y }, thickness: 1, color: ink }); y -= 12 }
const h = (t) => { y -= 6; text(t.toUpperCase(), { size: 9, f: bold, color: acc }); y -= 2 }
const p = c.person
text(p.name, { size: 26, f: bold }); y += 4
text(`${p.role} · ${p.city}, ${p.country}`, { size: 11, color: muted })
text(`${p.email} · ${p.phoneDisplay} · ${p.github.replace('https://', '')} · ${p.linkedin.replace('https://www.', '')}`, { size: 9, color: muted })
rule()
para(p.bio, { size: 10 })
h('Experience')
for (const e of c.experience.filter((e) => e.kind === 'job')) {
  text(e.title, { size: 11, f: bold }); y += 2
  text(`${e.org} · ${e.start} – ${e.end ?? 'present'}`, { size: 9, color: muted })
  para(e.desc, { size: 9.5 }); if (e.chips) text(e.chips.join(' · '), { size: 8.5, color: muted }); y -= 4
}
h('Education')
for (const e of c.education) { text(`${e.degree} — ${e.school}`, { size: 10, f: bold }); y += 2; text(`${e.years}${e.note ? ` · ${e.note}` : ''}`, { size: 9, color: muted }); y -= 2 }
h('Stack')
for (const l of ['client', 'server', 'data', 'tooling']) para(`${l[0].toUpperCase() + l.slice(1)}: ${c.tools.filter((t) => t.layer === l).map((t) => t.name).join(', ')}`, { size: 9.5 })
h('Languages'); text(p.languages.join(' · '), { size: 9.5 })
if (y < M + 20) throw new Error(`résumé overflowed one page by ${Math.round(M + 20 - y)}pt — reduce sizes`)
y = M - 10; text(`Generated from ${(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virajdomadia.vercel.app').replace('https://', '')} · ${new Date().toISOString().slice(0, 10)}`, { size: 8, color: muted })
doc.setTitle(`${p.name} — Résumé`); doc.setAuthor(p.name); doc.setSubject(p.role); doc.setKeywords(c.seo.keywords)
fs.writeFileSync('public/Viraj-Domadia-Resume.pdf', await doc.save())
console.log('wrote public/Viraj-Domadia-Resume.pdf')
