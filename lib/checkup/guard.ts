import { siteUrl } from '@/lib/site'

// Shared request guards for the check-up API: same-site only, plus a naive per-instance rate limit.

export function crossSite(req: Request) {
  const origin = req.headers.get('origin')
  if (origin === null) return false
  if (origin === siteUrl()) return false
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  try { return !host || new URL(origin).host !== host } catch { return true }
}

export function limiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return (req: Request) => {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
    const now = Date.now(), win = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
    win.push(now); hits.set(ip, win)
    if (hits.size > 5000) hits.clear()
    return win.length > max
  }
}

/** Tiny TTL cache so a link shared in a group chat doesn't re-run the whole check for every click. */
export function ttlCache<T>(ttlMs: number, max = 300) {
  const m = new Map<string, { at: number; v: T }>()
  return {
    get(k: string) { const e = m.get(k); if (!e) return undefined; if (Date.now() - e.at > ttlMs) { m.delete(k); return undefined } return e.v },
    set(k: string, v: T) { if (m.size >= max) m.delete(m.keys().next().value as string); m.set(k, { at: Date.now(), v }) },
  }
}
