import { parse, type HTMLElement } from 'node-html-parser'
import type { Check } from './report'
export * from './report'

export type PageInput = { url: string; status: number; html: string; headers: Record<string, string>; ms: number; bytes: number; robotsTxt: string | null; sitemapFound: boolean; now?: Date }

// Pure: a fetched page in, a list of plain-language checks out. No network here, so every rule is unit-tested.

const BUSINESS_TYPES = /Business|Organi[sz]ation|Corporation|Restaurant|Store|Shop|Hotel|Bakery|Cafe|BarOrPub|Brewery|Winery|Clinic|Dentist|Physician|Hospital|Pharmacy|Salon|Spa|Gym|HealthClub|School|Agency|Service|Attorney|Notary|Electrician|Plumber|Locksmith|Florist|Lodging|Resort|Campground/i
const ACTION_WORDS = /\b(book|order|enquir|inquir|contact|call|quote|appointment|reserve|buy|shop|whatsapp|get started|schedule|visit us|get in touch|request|subscribe|sign up|apply)\b/i
const MAPS = /google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page\//i
const WHATSAPP = /wa\.me\/|api\.whatsapp\.com|web\.whatsapp\.com|^whatsapp:|wa\.link\/|whatsapp\.com\/(send|message)/i
const SOCIAL = /instagram\.com|facebook\.com|fb\.com|linkedin\.com|youtube\.com|youtu\.be|x\.com\/|twitter\.com/i

const text = (el: HTMLElement | null | undefined) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim()
const meta = (root: HTMLElement, key: string) => root.querySelector(`meta[name="${key}" i], meta[property="${key}" i]`)?.getAttribute('content')?.trim() ?? ''
const clip = (s: string, n = 80) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

function jsonLdTypes(root: HTMLElement): string[] {
  const out: string[] = []
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk)
    if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>
      if (typeof o['@type'] === 'string') out.push(o['@type']); else if (Array.isArray(o['@type'])) out.push(...o['@type'].filter((t): t is string => typeof t === 'string'))
      Object.values(o).forEach(walk)
    }
  }
  for (const s of root.querySelectorAll('script[type="application/ld+json" i]')) { try { walk(JSON.parse(s.textContent)) } catch { /* broken JSON-LD counts as none */ } }
  return out
}

/** Does robots.txt shut out every crawler from the whole site? (`User-agent: *` group with `Disallow: /`) */
export function robotsBlocksAll(robots: string | null): boolean {
  if (!robots) return false
  let inStar = false, blocks = false, sawRule = false
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim(); if (!line) continue
    const [k, ...rest] = line.split(':'); const key = k.trim().toLowerCase(), val = rest.join(':').trim()
    if (key === 'user-agent') { if (sawRule) { inStar = false; sawRule = false } inStar = inStar || val === '*' }
    else if (key === 'disallow' || key === 'allow') { sawRule = true; if (inStar && key === 'disallow' && val === '/') blocks = true; if (inStar && key === 'allow' && val === '/') return false }
  }
  return blocks
}

export function analyze(p: PageInput): Check[] {
  const root = parse(p.html, { comment: false, blockTextElements: { script: true, style: false, noscript: false, pre: true } })
  const checks: Check[] = []
  const add = (c: Check) => checks.push(c)
  const links = root.querySelectorAll('a[href]').map((a) => ({ href: a.getAttribute('href') ?? '', label: `${text(a)} ${a.getAttribute('aria-label') ?? ''} ${a.getAttribute('title') ?? ''}`.trim() }))
  const hrefs = links.map((l) => l.href)
  const iframes = root.querySelectorAll('iframe[src]').map((f) => f.getAttribute('src') ?? '')
  const bodyText = text(root.querySelector('body') ?? root)
  const types = jsonLdTypes(root)
  const year = (p.now ?? new Date()).getFullYear()

  // ── google ──
  const title = text(root.querySelector('title'))
  const host = new URL(p.url).hostname.replace(/^www\./, '')
  const genericTitle = /^(home|homepage|welcome|index|untitled|my site|new page)$/i.test(title) || title.toLowerCase() === host
  add({ id: 'title', group: 'google', weight: 10, title: 'Page title Google shows in results',
    status: !title ? 'fail' : genericTitle || title.length < 15 || title.length > 65 ? 'warn' : 'pass',
    found: !title ? 'No title at all.' : `“${clip(title)}” (${title.length} characters)`,
    why: 'This is the blue headline people click in Google. A clear one says what you do and where, so the right people click.',
    fix: 'Use about 50–60 characters: what you do + your area + your name. E.g. “Wedding cakes in Andheri | Sugar & Co”.' })

  const desc = meta(root, 'description')
  add({ id: 'description', group: 'google', weight: 6, title: 'Description under your Google result',
    status: !desc ? 'fail' : desc.length < 50 || desc.length > 170 ? 'warn' : 'pass',
    found: !desc ? 'Missing, so Google picks random text from the page.' : `“${clip(desc, 110)}” (${desc.length} characters)`,
    why: 'The two lines under your headline in Google. It’s your free ad, so it should make people want to click.',
    fix: 'Write 120–160 characters with what you offer, who it’s for, and one reason to pick you.' })

  const robotsMeta = `${meta(root, 'robots')} ${meta(root, 'googlebot')} ${p.headers['x-robots-tag'] ?? ''}`.toLowerCase()
  const noindex = /noindex|none/.test(robotsMeta), blocked = robotsBlocksAll(p.robotsTxt)
  add({ id: 'indexable', group: 'google', weight: 14, title: 'Google is allowed to list this page',
    status: noindex || blocked ? 'fail' : 'pass',
    found: noindex ? 'The page tells Google “don’t list me” (noindex).' : blocked ? 'robots.txt blocks every search engine from the whole site.' : 'Yes, nothing is blocking Google.',
    why: 'If this is switched off, you will not appear in Google at all, however good the site is. It’s often left on by mistake after a redesign.',
    fix: noindex ? 'Remove the “noindex” robots tag from the page.' : 'Remove “Disallow: /” from robots.txt.' })

  const h1 = text(root.querySelector('h1'))
  add({ id: 'h1', group: 'google', weight: 4, title: 'Main heading on the page',
    status: h1 ? 'pass' : 'warn',
    found: h1 ? `“${clip(h1)}”` : 'No main heading (H1) found.',
    why: 'Google and visitors both use the main heading to understand what the page is about in a second.',
    fix: 'Give the page one clear main heading that says what you do, not just your name or “Welcome”.' })

  add({ id: 'sitemap', group: 'google', weight: 3, title: 'Sitemap for Google',
    status: p.sitemapFound ? 'pass' : 'warn',
    found: p.sitemapFound ? 'Found a sitemap.' : 'No sitemap found at /sitemap.xml or in robots.txt.',
    why: 'A sitemap is a list of your pages that helps Google find all of them, faster.',
    fix: 'Most website builders can generate one; then submit it in Google Search Console.' })

  const biz = types.find((t) => BUSINESS_TYPES.test(t))
  add({ id: 'business-info', group: 'google', weight: 5, title: 'Business details Google can read',
    status: biz ? 'pass' : 'warn',
    found: biz ? `Describes itself as a “${biz}”.` : 'No machine-readable business details (schema.org) found.',
    why: 'Hidden business details (name, address, hours, phone) help Google show you in local results and on Maps.',
    fix: 'Add LocalBusiness schema with your name, address, phone and opening hours.' })

  const imgs = root.querySelectorAll('img')
  if (imgs.length >= 3) {
    const withAlt = imgs.filter((i) => (i.getAttribute('alt') ?? '').trim() !== '' || i.getAttribute('role') === 'presentation').length
    const pct = Math.round((withAlt / imgs.length) * 100)
    add({ id: 'alt', group: 'google', weight: 3, title: 'Photos are described for Google',
      status: pct >= 80 ? 'pass' : pct >= 40 ? 'warn' : 'fail',
      found: `${withAlt} of ${imgs.length} images have a description (${pct}%).`,
      why: 'Google can’t see photos; the description (alt text) is how your dishes, products or work show up in image search.',
      fix: 'Add a short description to each photo, e.g. “chocolate truffle cake with gold leaf”.' })
  }

  // ── phone ──
  const vp = meta(root, 'viewport')
  add({ id: 'viewport', group: 'phone', weight: 12, title: 'Made for phone screens',
    status: /width\s*=\s*device-width/i.test(vp) ? 'pass' : 'fail',
    found: vp ? `Viewport: “${clip(vp)}”` : 'No mobile viewport set, so phones show a tiny desktop page.',
    why: 'Without this, phone visitors have to pinch and zoom. Most leave, and Google ranks the page lower on phones.',
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and check the layout on a phone.' })

  const isHttps = p.url.startsWith('https:')
  add({ id: 'https', group: 'phone', weight: 10, title: 'Secure connection (the padlock)',
    status: isHttps ? 'pass' : 'fail',
    found: isHttps ? 'Yes, the site loads over HTTPS.' : 'No, browsers show “Not secure” next to your address.',
    why: '“Not secure” warnings scare people off, especially on a page with a form or payment.',
    fix: 'Turn on free SSL (Let’s Encrypt); most hosts have a one-click switch. Then redirect http to https.' })

  const sec = (p.ms / 1000).toFixed(1)
  add({ id: 'response', group: 'phone', weight: 6, title: 'Server answers quickly',
    status: p.ms < 1500 ? 'pass' : p.ms < 3500 ? 'warn' : 'fail',
    found: `The page arrived in ${sec}s (${Math.round(p.bytes / 1024)} KB of HTML).`,
    why: 'Before anything shows, the server has to answer. Slow hosting makes every page slow.',
    fix: 'Better hosting or a CDN, and caching pages instead of building them on every visit.' })

  // ── contact ──
  const tel = hrefs.find((h) => /^tel:/i.test(h))
  add({ id: 'call', group: 'contact', weight: 12, title: 'Tap-to-call phone number',
    status: tel ? 'pass' : 'fail',
    found: tel ? `Yes: ${clip(decodeURIComponent(tel.replace(/^tel:/i, '')), 30)}` : 'No tap-to-call link. Visitors have to copy your number by hand, if it’s there at all.',
    why: 'On a phone, one tap to call is the shortest path from “interested” to a real enquiry.',
    fix: 'Make your number a link: <a href="tel:+91XXXXXXXXXX">. Put it at the top and bottom of the page.' })

  const wa = hrefs.find((h) => WHATSAPP.test(h))
  add({ id: 'whatsapp', group: 'contact', weight: 10, title: 'WhatsApp chat button',
    status: wa ? 'pass' : 'warn',
    found: wa ? 'Yes, there’s a WhatsApp link.' : 'No WhatsApp link found.',
    why: 'In India, many customers would rather WhatsApp than call or fill a form. A button opens a chat with you in one tap.',
    fix: 'Add a button linking to https://wa.me/91XXXXXXXXXX?text=Hi, with a pre-filled message about what they saw.' })

  const hasForm = root.querySelectorAll('form').some((f) => f.querySelectorAll('input, textarea').length >= 2)
  const mail = hrefs.find((h) => /^mailto:/i.test(h))
  const contactLink = links.find((l) => /contact|enquir|inquir|get in touch/i.test(`${l.href} ${l.label}`))
  add({ id: 'enquiry', group: 'contact', weight: 6, title: 'A way to send an enquiry',
    status: hasForm || mail || contactLink ? 'pass' : 'warn',
    found: hasForm ? 'Yes, there’s a form on the page.' : mail ? 'There’s an email link.' : contactLink ? `There’s a “${clip(contactLink.label || 'contact', 30)}” link.` : 'No form, email link or contact page link found.',
    why: 'Some people want to ask a question at night or without calling. Give them an easy way to leave it.',
    fix: 'Add a short form (name, phone, what you need) or at least a clear Contact page.' })

  const actions = [...links.map((l) => l.label), ...root.querySelectorAll('button, input[type="submit" i]').map((b) => `${text(b)} ${b.getAttribute('value') ?? ''}`)].filter((l) => ACTION_WORDS.test(l))
  add({ id: 'cta', group: 'contact', weight: 7, title: 'Clear next step (“Book”, “Order”, “Call”)',
    status: actions.length ? 'pass' : 'warn',
    found: actions.length ? `Found ${actions.length} action button${actions.length > 1 ? 's' : ''}, e.g. “${clip(actions[0].trim(), 40)}”.` : 'No obvious action button like Book, Order, Call or Get a quote.',
    why: 'Visitors don’t guess what to do next. A button that says exactly what happens gets far more enquiries.',
    fix: 'Put one bold action at the top: “Book a table”, “Get a free quote”, “Order on WhatsApp”.' })

  const mapsLink = [...hrefs, ...iframes].find((h) => MAPS.test(h)), address = root.querySelector('address') || types.includes('PostalAddress')
  add({ id: 'location', group: 'contact', weight: 5, title: 'Directions / location',
    status: mapsLink ? 'pass' : address ? 'warn' : 'warn',
    found: mapsLink ? 'Links to Google Maps.' : address ? 'Shows an address but no Maps link.' : 'No address or Google Maps link found.',
    why: 'For a local business, “how do I get there?” is the question right before a visit.',
    fix: 'Add a “Get directions” button linking to your Google Maps listing (and keep that listing up to date).' })

  // ── trust ──
  const ogImage = meta(root, 'og:image'), ogTitle = meta(root, 'og:title')
  add({ id: 'preview', group: 'trust', weight: 7, title: 'Preview when shared on WhatsApp',
    status: ogImage && ogTitle ? 'pass' : ogImage || ogTitle ? 'warn' : 'fail',
    found: ogImage && ogTitle ? 'Yes, shared links show a title and picture.' : ogImage ? 'A picture but no share title.' : ogTitle ? 'A title but no picture, so links look bare.' : 'No share preview: links show up as a plain grey URL.',
    why: 'Your customers share your link on WhatsApp. A photo and title turn it into an ad; a bare link gets ignored.',
    fix: 'Add og:title, og:description and og:image (1200×630 photo) tags.' })

  const social = [...new Set(hrefs.filter((h) => SOCIAL.test(h)).map((h) => h.match(SOCIAL)![0].replace(/\W+$/, '').replace(/\.com.*/, '').replace('youtu.be', 'youtube').replace('fb', 'facebook')))]
  add({ id: 'social', group: 'trust', weight: 3, title: 'Links to your social pages',
    status: social.length ? 'pass' : 'warn',
    found: social.length ? `Links to ${social.join(', ')}.` : 'No Instagram, Facebook, YouTube or LinkedIn links found.',
    why: 'Many people check your Instagram before they buy. Active social pages prove you’re real and busy.',
    fix: 'Link the social pages you actually keep updated, in the header or footer.' })

  const reviews = types.some((t) => /Review|AggregateRating/i.test(t)) || /testimonial|reviews?\b|what (our )?(clients|customers) say|★|rated \d/i.test(bodyText)
  add({ id: 'reviews', group: 'trust', weight: 5, title: 'Reviews or testimonials',
    status: reviews ? 'pass' : 'warn',
    found: reviews ? 'Mentions reviews or testimonials.' : 'No reviews or testimonials found on the page.',
    why: 'People trust other customers more than anything you say about yourself.',
    fix: 'Show 3–5 real Google reviews with names, and link to your Google review page.' })

  const years = [...bodyText.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map((m) => Number(m[1])).filter((y) => y > 1995 && y <= year + 1)
  if (years.length) {
    const latest = Math.max(...years)
    add({ id: 'fresh', group: 'trust', weight: 3, title: 'Looks up to date',
      status: latest >= year - 1 ? 'pass' : 'warn',
      found: latest >= year - 1 ? `Footer says © ${latest}.` : `Footer still says © ${latest}.`,
      why: 'An old year in the footer makes visitors wonder whether you’re still in business.',
      fix: 'Update the year (or make it update automatically) and refresh anything else that’s out of date.' })
  }
  return checks
}
