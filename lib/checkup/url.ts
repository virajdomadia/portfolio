import net from 'node:net'

/** What a visitor typed ("mybakery.in", "https://x.com/menu") → a URL we are willing to fetch, or null. */
export function normalizeUrl(input: string): URL | null {
  const raw = input.trim()
  if (!raw || raw.length > 2048 || /\s/.test(raw)) return null
  let url: URL
  try { url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`) } catch { return null }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
  if (url.username || url.password) return null
  if (url.port && url.port !== '80' && url.port !== '443') return null
  const host = url.hostname.toLowerCase().replace(/\.$/, '')
  if (net.isIP(host.replace(/^\[|\]$/g, ''))) return null // a business site has a domain name; bare IPs are refused outright
  if (!host.includes('.') || host.endsWith('.local') || host.endsWith('.internal') || host === 'localhost' || host.endsWith('.localhost')) return null
  url.hash = ''
  return url
}

const v4 = (ip: string) => ip.split('.').map(Number)
const inV4 = (ip: string, base: string, bits: number) => {
  const a = v4(ip), b = v4(base)
  const n = (x: number[]) => ((x[0] << 24) >>> 0) + (x[1] << 16) + (x[2] << 8) + x[3]
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
  return ((n(a) & mask) >>> 0) === ((n(b) & mask) >>> 0)
}
const V4_BLOCKED: [string, number][] = [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
  ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24],
  ['224.0.0.0', 4], ['240.0.0.0', 4],
]

/** True for any address that is not a normal public internet host: loopback, private, link-local, metadata, reserved. */
export function isPrivateIp(ip: string): boolean {
  const kind = net.isIP(ip)
  if (kind === 4) return V4_BLOCKED.some(([b, bits]) => inV4(ip, b, bits))
  if (kind !== 6) return true
  const x = ip.toLowerCase()
  const mapped = x.match(/^(?:0*:)*:?ffff:(\d+\.\d+\.\d+\.\d+)$/) ?? x.match(/^::(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return isPrivateIp(mapped[1])
  if (x === '::' || x === '::1') return true
  if (/^f[cd]/.test(x)) return true // fc00::/7 unique local
  if (/^fe[89ab]/.test(x)) return true // fe80::/10 link-local
  if (/^ff/.test(x)) return true // multicast
  if (x.startsWith('64:ff9b:') || x.startsWith('2001:db8') || x.startsWith('2001:0db8')) return true
  return false
}
