import http from 'node:http'
import https from 'node:https'
import dns from 'node:dns'
import zlib from 'node:zlib'
import type { LookupFunction } from 'node:net'
import { isPrivateIp } from './url'

// Fetches a visitor-supplied URL without letting it reach this server's own network. The address check runs inside
// the socket's DNS lookup, so the IP that is checked is the IP that is dialled (no rebinding between check and use).
// Redirects are followed by hand so every hop goes through the same check.

export type Fetched = { url: string; status: number; headers: Record<string, string>; body: string; bytes: number; ms: number; redirectedToHttps: boolean }
export class FetchError extends Error { constructor(public code: 'blocked' | 'dns' | 'timeout' | 'too_big' | 'too_many_redirects' | 'network', message: string) { super(message) } }

const MAX_BYTES = 3_000_000
const MAX_REDIRECTS = 4
const UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36 WebsiteCheckup/1.0 (+https://virajdomadia.com/tools/website-checkup)'

const guardedLookup: LookupFunction = (hostname, options, callback) => {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, '', 0)
    const list = addresses as dns.LookupAddress[]
    if (!list.length) return callback(Object.assign(new Error('no address'), { code: 'ENOTFOUND' }), '', 0)
    if (list.some((a) => isPrivateIp(a.address))) return callback(Object.assign(new Error('private address'), { code: 'EBLOCKED' }), '', 0)
    if (options.all) return (callback as unknown as (e: null, a: dns.LookupAddress[]) => void)(null, list)
    callback(null, list[0].address, list[0].family)
  })
}

function once(url: URL, deadline: number, maxBytes: number): Promise<{ status: number; headers: Record<string, string>; body: Buffer; location?: string }> {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === 'https:' ? https : http
    const left = deadline - Date.now()
    if (left <= 0) return reject(new FetchError('timeout', 'timed out'))
    const req = lib.request(url, {
      method: 'GET', lookup: guardedLookup, timeout: left,
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-encoding': 'gzip, deflate, br', 'accept-language': 'en-IN,en;q=0.9' },
    }, (res) => {
      const headers: Record<string, string> = {}
      for (const [k, v] of Object.entries(res.headers)) if (v !== undefined) headers[k] = Array.isArray(v) ? v.join(', ') : v
      const status = res.statusCode ?? 0
      if (status >= 300 && status < 400 && headers.location) { res.resume(); return resolve({ status, headers, body: Buffer.alloc(0), location: headers.location }) }
      const enc = (headers['content-encoding'] ?? '').toLowerCase()
      const stream = enc.includes('br') ? res.pipe(zlib.createBrotliDecompress()) : enc.includes('gzip') ? res.pipe(zlib.createGunzip()) : enc.includes('deflate') ? res.pipe(zlib.createInflate()) : res
      const chunks: Buffer[] = []; let size = 0
      stream.on('data', (c: Buffer) => { size += c.length; if (size > maxBytes) { req.destroy(); reject(new FetchError('too_big', 'page too large')) } else chunks.push(c) })
      stream.on('end', () => resolve({ status, headers, body: Buffer.concat(chunks) }))
      stream.on('error', (e) => reject(new FetchError('network', e.message)))
    })
    req.on('timeout', () => { req.destroy(); reject(new FetchError('timeout', 'timed out')) })
    req.on('error', (e: NodeJS.ErrnoException) => {
      if (e instanceof FetchError) return reject(e)
      if (e.code === 'EBLOCKED') return reject(new FetchError('blocked', 'private address'))
      if (e.code === 'ENOTFOUND' || e.code === 'EAI_AGAIN') return reject(new FetchError('dns', 'domain not found'))
      reject(new FetchError('network', e.message))
    })
    req.end()
  })
}

/** GET with redirects, each hop re-checked. `timeoutMs` covers the whole chain. */
export async function safeFetch(start: URL, { timeoutMs = 10_000, maxBytes = MAX_BYTES } = {}): Promise<Fetched> {
  const t0 = Date.now(), deadline = t0 + timeoutMs
  let url = start, redirectedToHttps = false
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const r = await once(url, deadline, maxBytes)
    if (r.location) {
      const next = new URL(r.location, url)
      if (next.protocol !== 'http:' && next.protocol !== 'https:') throw new FetchError('blocked', 'unsupported redirect')
      if (url.protocol === 'http:' && next.protocol === 'https:') redirectedToHttps = true
      url = next; continue
    }
    return { url: url.toString(), status: r.status, headers: r.headers, body: r.body.toString('utf8'), bytes: r.body.length, ms: Date.now() - t0, redirectedToHttps }
  }
  throw new FetchError('too_many_redirects', 'too many redirects')
}
