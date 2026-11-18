import type { MetadataRoute } from 'next'
import { absolute } from '@/lib/site'

// AI crawlers are explicitly welcome (GEO): being in answer indexes is the point of the site.
const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bytespider', 'meta-externalagent']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }, { userAgent: AI_BOTS, allow: '/', disallow: ['/api/'] }],
    sitemap: absolute('/sitemap.xml'), // no Host line: a Yandex-only directive that other crawlers ignore or flag as unknown
  }
}
