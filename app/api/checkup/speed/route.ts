import { NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/checkup/url'
import { crossSite, limiter, ttlCache } from '@/lib/checkup/guard'

// Google PageSpeed Insights (mobile, performance only). Slow (10–30 s), so the page asks for it separately and
// shows the rest of the report first. PSI_API_KEY lifts Google's anonymous quota; without it this may 429.
export const runtime = 'nodejs'
export const maxDuration = 60

const limited = limiter(15, 10 * 60_000)
const cache = ttlCache<{ perf: number; lcp?: string }>(30 * 60_000)

export async function POST(req: Request) {
  if (crossSite(req)) return NextResponse.json({ error: 'Cross-site requests are not accepted.' }, { status: 403 })
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null
  const url = typeof body?.url === 'string' ? normalizeUrl(body.url) : null
  if (!url) return NextResponse.json({ error: 'bad url' }, { status: 400 })
  const hit = cache.get(url.toString())
  if (hit) return NextResponse.json(hit)
  if (limited(req)) return NextResponse.json({ error: 'rate limited' }, { status: 429 })
  const q = new URLSearchParams({ url: url.toString(), strategy: 'mobile', category: 'performance' })
  if (process.env.PSI_API_KEY) q.set('key', process.env.PSI_API_KEY)
  try {
    const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${q}`, { signal: AbortSignal.timeout(55_000), cache: 'no-store' })
    if (!r.ok) return NextResponse.json({ error: `speed test unavailable (${r.status})` }, { status: 502 })
    const j = await r.json() as { lighthouseResult?: { categories?: { performance?: { score?: number | null } }; audits?: Record<string, { displayValue?: string }> } }
    const s = j.lighthouseResult?.categories?.performance?.score
    if (typeof s !== 'number') return NextResponse.json({ error: 'speed test returned no score' }, { status: 502 })
    const result = { perf: Math.round(s * 100), lcp: j.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue?.replace(/ /g, ' ') }
    cache.set(url.toString(), result)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'speed test timed out' }, { status: 504 })
  }
}
