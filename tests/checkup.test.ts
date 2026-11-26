import { describe, it, expect } from 'vitest'
import { normalizeUrl, isPrivateIp } from '@/lib/checkup/url'
import { analyze, robotsBlocksAll, score, topFixes, speedCheck, type PageInput } from '@/lib/checkup/analyze'

describe('normalizeUrl', () => {
  it('adds https to a bare domain and keeps the path', () => {
    expect(normalizeUrl('mybakery.in')?.toString()).toBe('https://mybakery.in/')
    expect(normalizeUrl('  http://x.co/menu#top ')?.toString()).toBe('http://x.co/menu')
  })
  it('refuses anything that is not a public http(s) site', () => {
    for (const bad of ['', 'localhost', 'http://localhost:3000', 'ftp://x.com', 'file:///etc/passwd', 'http://127.0.0.1', 'http://[::1]/', 'http://10.0.0.1', 'intranet', 'http://u:p@x.com', 'http://x.com:8080', 'printer.local', 'a b.com', 'http://169.254.169.254/latest'])
      expect(normalizeUrl(bad), bad).toBeNull()
  })
})

describe('isPrivateIp', () => {
  it('blocks loopback, private, link-local, metadata and mapped forms', () => {
    for (const ip of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0', '::1', '::', 'fd00::1', 'fe80::1', '::ffff:127.0.0.1', '::ffff:10.0.0.1', 'garbage'])
      expect(isPrivateIp(ip), ip).toBe(true)
  })
  it('allows public addresses', () => {
    for (const ip of ['8.8.8.8', '172.32.0.1', '76.76.21.21', '2606:4700::1111']) expect(isPrivateIp(ip), ip).toBe(false)
  })
})

describe('robotsBlocksAll', () => {
  it('only when the * group disallows /', () => {
    expect(robotsBlocksAll('User-agent: *\nDisallow: /')).toBe(true)
    expect(robotsBlocksAll('User-agent: *\nDisallow: /admin')).toBe(false)
    expect(robotsBlocksAll('User-agent: BadBot\nDisallow: /\n\nUser-agent: *\nDisallow:')).toBe(false)
    expect(robotsBlocksAll(null)).toBe(false)
  })
})

const base: Omit<PageInput, 'html'> = { url: 'https://sugarco.in/', status: 200, headers: {}, ms: 400, bytes: 20_000, robotsTxt: null, sitemapFound: true, now: new Date('2026-11-27') }
const good = `<!doctype html><html lang="en"><head>
<title>Wedding cakes in Andheri, Mumbai | Sugar &amp; Co</title>
<meta name="description" content="Custom wedding and birthday cakes baked fresh in Andheri West. Order on WhatsApp, delivered across Mumbai the same day.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="Sugar & Co"><meta property="og:image" content="/og.jpg">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Bakery","address":{"@type":"PostalAddress"}}</script>
</head><body><h1>Wedding cakes, baked fresh</h1>
<a href="tel:+919999999999">Call us</a> <a href="https://wa.me/919999999999">Order on WhatsApp</a>
<a href="https://maps.app.goo.gl/abc">Get directions</a> <a href="https://instagram.com/sugarco">Instagram</a>
<section>What our customers say ★★★★★</section><form><input name="n"><textarea name="m"></textarea><button>Send enquiry</button></form>
<img src="a.jpg" alt="cake"><img src="b.jpg" alt="cake 2"><img src="c.jpg" alt="cake 3"><footer>© 2026 Sugar & Co</footer></body></html>`

const byId = (html: string, extra: Partial<PageInput> = {}) => Object.fromEntries(analyze({ ...base, ...extra, html }).map((c) => [c.id, c]))

describe('analyze', () => {
  it('a well-built small-business page passes every check', () => {
    const checks = analyze({ ...base, html: good })
    expect(checks.filter((c) => c.status !== 'pass').map((c) => c.id)).toEqual([])
    expect(score(checks)).toBe(100)
  })
  it('an empty page fails the basics and puts the heaviest failures first', () => {
    const checks = analyze({ ...base, url: 'http://bare.in/', html: '<html><body><p>Hello</p></body></html>' })
    const c = Object.fromEntries(checks.map((x) => [x.id, x]))
    for (const id of ['title', 'description', 'viewport', 'https', 'call', 'preview']) expect(c[id].status, id).toBe('fail')
    expect(c.whatsapp.status).toBe('warn')
    expect(topFixes(checks).map((x) => x.id)).toEqual(['viewport', 'call', 'title'])
    expect(score(checks)).toBeLessThan(40)
  })
  it('flags noindex and a robots.txt that blocks everything', () => {
    expect(byId(good.replace('<head>', '<head><meta name="robots" content="noindex">')).indexable.status).toBe('fail')
    expect(byId(good, { robotsTxt: 'User-agent: *\nDisallow: /' }).indexable.status).toBe('fail')
    expect(byId(good, { headers: { 'x-robots-tag': 'noindex' } }).indexable.status).toBe('fail')
  })
  it('warns on a generic title and an old footer year', () => {
    const c = byId(good.replace(/<title>.*<\/title>/, '<title>Home</title>').replace('© 2026', '© 2019'))
    expect(c.title.status).toBe('warn'); expect(c.fresh.status).toBe('warn'); expect(c.fresh.found).toMatch(/2019/)
  })
  it('skips the alt and freshness checks when there is nothing to judge', () => {
    const c = byId('<html><head><title>x</title></head><body><img src=a></body></html>')
    expect(c.alt).toBeUndefined(); expect(c.fresh).toBeUndefined()
  })
  it('slow server responses warn, then fail', () => {
    expect(byId(good, { ms: 2000 }).response.status).toBe('warn')
    expect(byId(good, { ms: 5000 }).response.status).toBe('fail')
  })
})

describe('speedCheck', () => {
  it('bands the PageSpeed score', () => {
    expect(speedCheck(90).status).toBe('pass'); expect(speedCheck(50).status).toBe('warn'); expect(speedCheck(20, '6.1 s').found).toMatch(/6\.1 s/)
  })
})
