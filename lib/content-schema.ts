// zod schemas for the site content. Server/test only: lib/content.ts is imported by client components, so it must not pull zod in.
import { z } from 'zod'

export const LayerSchema = z.enum(['client', 'server', 'data', 'tooling'])
export type Layer = z.infer<typeof LayerSchema>

export const ProjectSchema = z.object({
  slug: z.string(), code: z.string().max(4), title: z.string(), category: z.string(),
  blurb: z.string().max(220), stack: z.array(z.string()).min(1), live: z.string().url(), repo: z.string().url(),
  image: z.string().startsWith('/images/'),
})
export const ToolSchema = z.object({
  key: z.string(), name: z.string(), layer: LayerSchema, years: z.number().int().min(1).max(3),
  brand: z.string().regex(/^#[0-9A-F]{6}$/i),
})
export const ExperienceSchema = z.object({
  year: z.string(), period: z.string(), title: z.string(), org: z.string(), desc: z.string(), chips: z.array(z.string()).optional(), kind: z.enum(['job', 'study']),
})
export const ContentSchema = z.object({
  person: z.object({ name: z.string(), first: z.string(), last: z.string(), role: z.string(), city: z.string(), email: z.string().email(), github: z.string().url(), linkedin: z.string().url(), resume: z.string(), available: z.string() }),
  hero: z.object({ eyebrow: z.array(z.string()).length(3), lede: z.string(), corners: z.array(z.string()).length(4), stats: z.array(z.object({ n: z.string(), label: z.string() })).length(3) }),
  marquee: z.object({ stack: z.array(z.string()), projects: z.array(z.string()) }),
  about: z.object({ quote: z.string(), quoteBold: z.array(z.string()).length(2), photoAlt: z.string(), captions: z.array(z.string()).length(2), counters: z.array(z.object({ to: z.number(), suffix: z.string(), label: z.string() })).length(3), rail: z.string() }),
  experience: z.array(ExperienceSchema).length(4),
  projects: z.array(ProjectSchema).length(5),
  work: z.object({ after: z.string(), afterCta: z.string() }),
  tools: z.array(ToolSchema),
  stack: z.object({ heading: z.string(), headingBold: z.string(), note: z.string() }),
  band: z.object({ headline: z.string(), sub: z.string(), alt: z.string() }),
  contact: z.object({ heading: z.string(), headingBold: z.string(), lead: z.string(), intents: z.array(z.object({ value: z.string(), label: z.string() })).length(3), practical: z.array(z.string()).length(3), sentTitle: z.string(), sentBody: z.string() }),
  footer: z.object({ tech: z.string() }),
})
export type Content = z.infer<typeof ContentSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Tool = z.infer<typeof ToolSchema>
export type Experience = z.infer<typeof ExperienceSchema>
