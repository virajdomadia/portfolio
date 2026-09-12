import type { MetadataRoute } from 'next'
import { absolute } from '@/lib/site'
import { content } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absolute('/'), lastModified: now, changeFrequency: 'monthly', priority: 1, images: [absolute('/opengraph-image')] },
    { url: absolute('/llms.txt'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: absolute(content.person.resume), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]
}
