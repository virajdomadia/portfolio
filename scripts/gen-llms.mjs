// Writes public/llms.txt (llmstxt.org convention) from lib/content.ts so the AI-readable summary never drifts from the site.
// Run: pnpm gen:llms (also runs as `prebuild`).
import fs from 'node:fs'
import { content as c } from '../lib/content.ts'

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://virajdomadia.vercel.app').replace(/\/+$/, '')
const p = c.person
const cap = (s) => s[0].toUpperCase() + s.slice(1)
const lines = [
  `# ${p.name}`, '',
  `> ${p.role} in ${p.city}, ${p.country}. ${p.jobTitle} at ${p.employer.name} (${p.employer.url}). Open to full-time and freelance work, on-site in ${p.city} or remote.`, '',
  '## About', '', p.bio, '',
  '## Experience', '',
  ...c.experience.map((e) => `- ${e.title} (${e.start} → ${e.end ?? 'present'}): ${e.desc}${e.extra ? ' ' + e.extra : ''}`), '',
  '## Education', '',
  ...c.education.map((e) => `- ${e.degree}, ${e.school}, ${e.years}${e.note ? ` (${e.note})` : ''}`), '',
  '## Stack', '',
  ...['client', 'server', 'data', 'tooling'].map((l) => `- ${cap(l)}: ${c.tools.filter((t) => t.layer === l).map((t) => `${t.name} (${t.years} yr${t.years > 1 ? 's' : ''})`).join(', ')}`), '',
  '## Projects', '', ...c.projects.map((pr) => `- **${pr.title}** (${pr.category}; ${pr.status.toLowerCase()}): ${pr.blurb} Live: ${pr.live} · Source: ${pr.repo}`), '', c.projectsNote.after, '',
  '## FAQ', '',
  ...c.faq.flatMap((f) => [`**${f.q}** ${f.a}`, '']),
  '## Contact', '',
  `- Email: ${p.email}`, `- Phone: ${p.phoneDisplay}`, `- GitHub: ${p.github}`, `- LinkedIn: ${p.linkedin}`, `- Résumé: ${site}${p.resume}`, `- Site: ${site}`, '',
  '## Pages', '', `- [Home](${site}/)`, `- [Résumé PDF](${site}${p.resume})`, '',
]
fs.writeFileSync('public/llms.txt', lines.join('\n'))
fs.copyFileSync('public/llms.txt', 'public/llms-full.txt') // identical until case studies exist (Phase B)
console.log('wrote public/llms.txt')
