// zod schemas for the site content. Test-only: lib/content.ts is imported by client components and must not pull zod in.
import { z } from 'zod'

export const LayerSchema = z.enum(['client', 'server', 'data', 'tooling'])
export type Layer = z.infer<typeof LayerSchema>

export const ProjectSchema = z.object({
  slug: z.string(), title: z.string(), category: z.string(), status: z.string(), blurb: z.string().max(220), stack: z.array(z.string()).min(1),
  live: z.string().url(), repo: z.string().url(), image: z.string().startsWith('/images/'),
})
export const ToolSchema = z.object({
  key: z.string(), name: z.string(), layer: LayerSchema, years: z.number().int().min(1).max(3), brand: z.string().regex(/^#[0-9A-F]{6}$/i),
})
export const ExperienceSchema = z.object({
  year: z.string(), period: z.string(), title: z.string(), org: z.string(), orgUrl: z.string().url().optional(),
  start: z.string().regex(/^\d{4}-\d{2}$/), end: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
  desc: z.string(), extra: z.string().optional(), chips: z.array(z.string()).optional(), kind: z.enum(['job', 'study']),
})
export const ContentSchema = z.object({
  person: z.object({
    name: z.string(), first: z.string(), last: z.string(), role: z.string(), roleShort: z.string(), jobTitle: z.string(),
    city: z.string(), region: z.string(), country: z.string(), countryCode: z.string().length(2), origin: z.string(), tz: z.string(),
    email: z.string().email(), phone: z.string().regex(/^\+\d{10,15}$/), phoneDisplay: z.string(),
    github: z.string().url(), linkedin: z.string().url(), resume: z.string(), available: z.string(),
    languages: z.array(z.string()).min(1), bio: z.string().min(200), employer: z.object({ name: z.string(), url: z.string().url() }),
  }),
  hero: z.object({ eyebrow: z.array(z.string()).length(3), lede: z.string(), corners: z.array(z.string()).length(4), stats: z.array(z.object({ n: z.string(), label: z.string() })).length(3), bgAlt: z.string() }),
  marquee: z.object({ stack: z.array(z.string()), b: z.array(z.string()) }),
  about: z.object({ quote: z.string(), quoteBold: z.array(z.string()).length(2), photoAlt: z.string(), captions: z.array(z.string()).length(2), counters: z.array(z.object({ to: z.number(), suffix: z.string(), label: z.string() })).length(3), rail: z.string() }),
  experience: z.array(ExperienceSchema).length(4),
  education: z.array(z.object({ degree: z.string(), school: z.string(), schoolUrl: z.string().url().optional(), years: z.string(), note: z.string().optional() })).length(2),
  projects: z.array(ProjectSchema).length(6),
  projectsNote: z.object({ after: z.string(), afterCta: z.string() }),
  tools: z.array(ToolSchema),
  stack: z.object({ heading: z.string(), headingBold: z.string(), note: z.string() }),
  band: z.object({ headline: z.string(), sub: z.string(), alt: z.string() }),
  contact: z.object({ heading: z.string(), headingBold: z.string(), lead: z.string(), intents: z.array(z.object({ value: z.string(), label: z.string() })).length(3), practical: z.array(z.string()).length(3), sentTitle: z.string(), sentBody: z.string() }),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).length(4),
  seo: z.object({ siteName: z.string(), title: z.string().max(70), description: z.string().max(160), keywords: z.array(z.string()).min(5), sameAs: z.array(z.string().url()).min(2) }),
  footer: z.object({ tech: z.string() }),
})
export type Content = z.infer<typeof ContentSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Tool = z.infer<typeof ToolSchema>
export type Experience = z.infer<typeof ExperienceSchema>
