// Pure builders for public/llms.txt and public/llms-full.txt (llmstxt.org). gen-llms.mjs writes them; tests call them directly.
const cap = (s) => s[0].toUpperCase() + s.slice(1)

export function llmsText(c, site, guides = []) {
  const p = c.person
  const pages = c.projects.filter((pr) => pr.detail).map((pr) => `- [${pr.title} — project page](${site}/projects/${pr.slug})`)
  return [
  `# ${p.name}`, '',
  `> ${p.role} in ${p.city}, ${p.country}. Open to full-time and freelance work, on-site in ${p.city} or remote.`, '',
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
  ...(guides.length ? ['## Free tool and guides for small businesses', '', `- [Free website check](${site}/tools/website-checkup): paste a business website and get a plain-language report (Google visibility, phone-friendliness, tap-to-call and WhatsApp, trust) with the top 3 fixes. Free, no sign-up.`, ...guides.map((g) => `- [${g.title}](${site}/guides/${g.slug}): ${g.description}`), ''] : []),
  '## Pages', '', `- [Home](${site}/)`, ...pages, `- [Résumé PDF](${site}${p.resume})`, '',
].join('\n')
}

export function llmsFullText(c, site, guides = []) {
  const studies = c.projects.filter((pr) => pr.detail).flatMap((pr) => {
    const d = pr.detail
    return [
      `## ${pr.title} — case study`, '', `${d.pitch} Page: ${site}/projects/${pr.slug}`, '',
      `**The problem.** ${d.sections.problem}`, '', `**What I built.** ${d.sections.built}`, '',
      '**Key decisions.**', ...d.sections.decisions.map((x, i) => `${i + 1}. ${x.title} — ${x.body}`), '',
      '**Versions.**', ...d.versions.map((v) => `- ${v.name} (${v.state}): ${v.summary}`), '',
      `**Outcome.** ${d.sections.outcome}`, '',
    ]
  })
  return studies.length ? [llmsText(c, site, guides), ...studies].join('\n') : llmsText(c, site, guides)
}
