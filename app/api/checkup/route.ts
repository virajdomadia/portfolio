import { NextResponse } from 'next/server'
import { normalizeUrl } from '@/lib/checkup/url'
import { safeFetch, FetchError } from '@/lib/checkup/safe-fetch'
import { analyze, type Check } from '@/lib/checkup/analyze'
import { crossSite, limiter, ttlCache } from '@/lib/checkup/guard'

export const runtime = 'nodejs'
export const maxDuration = 30

const limited = limiter(15, 10 * 60_000)
const cache = ttlCache<{ url: string; checks: Check[] }>(10 * 60_000)

const ERRORS: Record<FetchError['code'], [number, string]> = {
  blocked: [400, 'That address can’t be checked. Please enter a public website address.'],
  dns: [422, 'We couldn’t find that website. Check the spelling, e.g. mybakery.in.'],
  timeout: [504, 'The website took too long to answer (over 12 seconds). That alone loses most visitors.'],
  too_big: [422, 'The page is unusually large (over 3 MB of HTML), so we stopped loading it.'],
  too_many_redirects: [422, 'The website keeps redirecting to itself, so it never loads.'],
  network: [502, 'We couldn’t connect to that website. It may be down or blocking automated checks.'],
}

/** Does http://host/ end up on https? undefined when port 80 doesn't answer at all (nothing to judge). */
async function httpGoesSecure(final: URL): Promise<boolean | undefined> {
  const http = new URL('/', final.origin); http.protocol = 'http:'
  try { return (await safeFetch(http, { timeoutMs: 4000, maxBytes: 200_000 })).url.startsWith('https:') }
  catch (e) { return e instanceof FetchError && e.code === 'too_big' ? false : undefined } // too_big: it served a whole page over http
}

async function hasFavicon(final: URL) {
  try { const r = await safeFetch(new URL('/favicon.ico', final.origin), { timeoutMs: 3000, maxBytes: 200_000 }); return r.status === 200 && !/html/i.test(r.headers['content-type'] ?? '') } catch { return false }
}

async function optional(url: URL, path: string) {
  try { const r = await safeFetch(new URL(path, url.origin), { timeoutMs: 4000, maxBytes: 300_000 }); return r.status === 200 ? r.body : null } catch { return null }
}

export async function POST(req: Request) {
  if (crossSite(req)) return NextResponse.json({ error: 'Cross-site requests are not accepted.' }, { status: 403 })
  const body = (await req.json().catch(() => null)) as { url?: unknown } | null
  const url = typeof body?.url === 'string' ? normalizeUrl(body.url) : null
  if (!url) return NextResponse.json({ error: 'Please enter a website address, like mybakery.in.' }, { status: 400 })
  const key = url.toString()
  const hit = cache.get(key)
  if (hit) return NextResponse.json(hit)
  if (limited(req)) return NextResponse.json({ error: 'You’ve run a lot of checks. Please wait a few minutes and try again.' }, { status: 429 })
  try {
    const typedScheme = /^https?:\/\//i.test(String(body?.url).trim())
    // a bare domain is tried over https first; a site with no working https still gets a report (which then flags it)
    const page = await safeFetch(url, { timeoutMs: 12_000 }).catch(async (e) => {
      if (typedScheme || url.protocol !== 'https:' || !(e instanceof FetchError) || e.code !== 'network') throw e
      const http = new URL(url); http.protocol = 'http:'
      return safeFetch(http, { timeoutMs: 8_000 })
    })
    const type = page.headers['content-type'] ?? ''
    if (page.status >= 400) return NextResponse.json({ error: `The website answered with an error (HTTP ${page.status}), so visitors see an error page too.` }, { status: 422 })
    if (type && !/html/i.test(type)) return NextResponse.json({ error: 'That address isn’t a web page (it returned a file). Enter your home page address.' }, { status: 422 })
    const final = new URL(page.url)
    const [robotsTxt, sitemap, httpRedirectsToHttps, faviconFound] = await Promise.all([
      optional(final, '/robots.txt'), optional(final, '/sitemap.xml'),
      final.protocol === 'https:' ? httpGoesSecure(final) : Promise.resolve(undefined), hasFavicon(final),
    ])
    const sitemapFound = Boolean(sitemap && /<(urlset|sitemapindex)/i.test(sitemap)) || /^\s*sitemap:/im.test(robotsTxt ?? '')
    const checks = analyze({ url: page.url, status: page.status, html: page.body, headers: page.headers, ms: page.ms, bytes: page.bytes, robotsTxt, sitemapFound, httpRedirectsToHttps, faviconFound })
    const result = { url: final.toString(), checks }
    cache.set(key, result)
    console.log(JSON.stringify({ evt: 'checkup', host: final.hostname, n: checks.length }))
    return NextResponse.json(result)
  } catch (e) {
    if (e instanceof FetchError) { const [status, error] = ERRORS[e.code]; return NextResponse.json({ error }, { status }) }
    return NextResponse.json({ error: 'Something went wrong checking that site. Please try again.' }, { status: 500 })
  }
}
