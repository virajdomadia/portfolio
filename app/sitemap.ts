import type { MetadataRoute } from 'next'
import { absolute } from '@/lib/site'
import { content } from '@/lib/content'
import { detailProjects } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absolute('/'), lastModified: now, changeFrequency: 'monthly', priority: 1, images: [absolute('/opengraph-image')] },
    ...detailProjects().map((p) => ({
      url: absolute(`/projects/${p.slug}`), lastModified: new Date(p.detail.updated), changeFrequency: 'monthly' as const, priority: 0.7,
      images: [absolute(`/projects/${p.slug}/opengraph-image`), ...p.detail.media.map((m) => absolute(m.kind === 'image' ? m.src : m.poster))],
    })),
    { url: absolute('/llms.txt'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: absolute(content.person.resume), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]
}
