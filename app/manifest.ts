import type { MetadataRoute } from 'next'
import { content } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: content.person.name, short_name: 'Viraj D.', description: content.seo.description, start_url: '/', display: 'browser',
    background_color: '#1F1B10', theme_color: '#F7E6A2',
    icons: [{ src: '/icon', sizes: '512x512', type: 'image/png' }, { src: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  }
}
