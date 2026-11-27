import { parse, type HTMLElement } from 'node-html-parser'
import type { Check } from './report'
export * from './report'

/** httpRedirectsToHttps / faviconFound come from extra requests the route makes; undefined = not checked, so that check is skipped. */
export type PageInput = { url: string; status: number; html: string; headers: Record<string, string>; ms: number; bytes: number; robotsTxt: string | null; sitemapFound: boolean; httpRedirectsToHttps?: boolean; faviconFound?: boolean; now?: Date }

// Pure: a fetched page in, a list of plain-language checks out. No network here, so every rule is unit-tested.

const BUSINESS_TYPES = /Business|Organi[sz]ation|Corporation|Restaurant|Store|Shop|Hotel|Bakery|Cafe|BarOrPub|Brewery|Winery|Clinic|Dentist|Physician|Hospital|Pharmacy|Salon|Spa|Gym|HealthClub|School|Agency|Service|Attorney|Notary|Electrician|Plumber|Locksmith|Florist|Lodging|Resort|Campground/i
const ACTION_WORDS = /\b(book|order|enquir|inquir|contact|call|quote|appointment|reserve|buy|shop|whatsapp|get started|schedule|visit us|get in touch|request|subscribe|sign up|apply)\b/i
const MAPS = /google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page\//i
const WHATSAPP = /wa\.me\/|api\.whatsapp\.com|web\.whatsapp\.com|^whatsapp:|wa\.link\/|whatsapp\.com\/(send|message)/i
const MOBILE = /(?:\+?91[\s-]?)?(?<!\d)[6-9]\d{4}[\s-]?\d{5}(?!\d)/
const PRICE = /₹|\brs\.?\s?\d|\binr\b|\d\s?\/-|\bprice|\bpricing\b|\bstarting (?:at|from)\b|\bper (?:person|night|month|session|plate)\b/i
const HOURS = /\b(?:open(?:ing)? hours|timings?|business hours|working hours|we(?:'|’)re open|open (?:daily|today|7 days)|mon(?:day)?\s*(?:-|–|to)\s*(?:fri|sat|sun))|\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\s*(?:-|–|to)\s*\d{1,2}(?::\d{2})?\s?(?:am|pm)\b/i
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
  const types = jsonLdTypes(root)
  const ldRaw = root.querySelectorAll('script[type="application/ld+json" i]').map((x) => x.textContent).join(' ')
  const scriptSrcs = root.querySelectorAll('script[src]').map((x) => x.getAttribute('src') ?? '')
  const isHttps = p.url.startsWith('https:')
  // insecure (http://) files on a secure page: browsers block or flag them
  const insecure = isHttps ? root.querySelectorAll('script[src], img[src], iframe[src], link[rel~="stylesheet" i][href], source[src], video[src], audio[src]').map((x) => x.getAttribute('src') ?? x.getAttribute('href') ?? '').filter((u) => /^http:\/\//i.test(u)) : []
  // the words a visitor reads: script/style contents removed, so code can't fake a match
  for (const x of root.querySelectorAll('script, style, noscript, template')) x.remove()
  const bodyText = text(root.querySelector('body') ?? root)
  const words = bodyText.split(' ').filter((w) => /\p{L}{2,}/u.test(w)).length
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
    // alt="" is a deliberate "decorative" mark (often a card photo next to its own title); only a missing alt is a gap
    const described = imgs.filter((i) => (i.getAttribute('alt') ?? '').trim() !== '').length
    const decorative = imgs.filter((i) => i.hasAttribute('alt') && (i.getAttribute('alt') ?? '').trim() === '' || i.getAttribute('role') === 'presentation').length
    const missing = imgs.length - described - decorative
    const pct = Math.round(((imgs.length - missing) / imgs.length) * 100)
    add({ id: 'alt', group: 'google', weight: 3, title: 'Photos are described for Google',
      status: pct >= 80 ? 'pass' : pct >= 40 ? 'warn' : 'fail',
      found: `${described} of ${imgs.length} images have a description${decorative ? `, ${decorative} ${decorative === 1 ? 'is' : 'are'} marked decorative` : ''}${missing ? `, ${missing} ${missing === 1 ? 'has' : 'have'} none at all` : ''}.${decorative > described ? ' If the decorative ones are photos of what you sell, describing them helps them appear in Google Images.' : ''}`,
      why: 'Google can’t see photos; the description (alt text) is how your dishes, products or work show up in image search.',
      fix: 'Add a short description to each photo, e.g. “chocolate truffle cake with gold leaf”.' })
  }

  const canonical = root.querySelector('link[rel="canonical" i]')?.getAttribute('href')?.trim() ?? ''
  let canonHost = ''
  try { canonHost = canonical ? new URL(canonical, p.url).hostname.replace(/^www\./, '') : '' } catch { canonHost = '?' }
  const canonOff = Boolean(canonical) && canonHost !== host
  add({ id: 'canonical', group: 'google', weight: 4, title: 'Tells Google which address is the real one',
    status: !canonical ? 'warn' : canonOff ? 'fail' : 'pass',
    found: !canonical ? 'No canonical tag, so Google has to guess between versions like www and non-www.' : canonOff ? `The canonical tag points to a different site: ${clip(canonical, 60)}. Google may list that site instead of this one.` : `Yes: ${clip(canonical, 60)}`,
    why: 'Most sites can be reached at several addresses (with or without www, with tracking codes). The canonical tag tells Google which one to show, so your ranking isn’t split.',
    fix: canonOff ? 'Point the canonical tag at this site’s own address. This often happens when a template or old site was copied.' : 'Add <link rel="canonical" href="https://yoursite.in/"> to each page (SEO plugins do this automatically).' })

  add({ id: 'content', group: 'google', weight: 5, title: 'Enough words for Google to understand the page',
    status: words >= 300 ? 'pass' : words >= 120 ? 'warn' : 'fail',
    found: `About ${words.toLocaleString('en-IN')} words of readable text on the page.`,
    why: 'Google ranks pages by what they say. A page that is mostly images or a few lines gives it almost nothing to match against people’s searches.',
    fix: 'Describe what you offer, who it’s for, where you work, prices and common questions, in normal sentences (aim for 300+ words on the home page).' })

  const lang = root.querySelector('html')?.getAttribute('lang')?.trim()
  add({ id: 'lang', group: 'google', weight: 2, title: 'Page language is declared',
    status: lang ? 'pass' : 'warn',
    found: lang ? `Language set to “${lang}”.` : 'No language set on the page.',
    why: 'Declaring the language helps Google show the page to the right people, and helps screen readers and translation tools.',
    fix: 'Add lang="en" (or hi, mr, ta…) to the <html> tag.' })

  // ── phone ──
  const vp = meta(root, 'viewport')
  add({ id: 'viewport', group: 'phone', weight: 12, title: 'Made for phone screens',
    status: /width\s*=\s*device-width/i.test(vp) ? 'pass' : 'fail',
    found: vp ? `Viewport: “${clip(vp)}”` : 'No mobile viewport set, so phones show a tiny desktop page.',
    why: 'Without this, phone visitors have to pinch and zoom. Most leave, and Google ranks the page lower on phones.',
    fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and check the layout on a phone.' })

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

  if (isHttps && p.httpRedirectsToHttps !== undefined) add({ id: 'https-redirect', group: 'phone', weight: 5, title: 'Old http:// links go to the secure version',
    status: p.httpRedirectsToHttps ? 'pass' : 'fail',
    found: p.httpRedirectsToHttps ? 'Yes, http:// addresses forward to https://.' : 'No. Opening http:// (no s) shows an insecure version instead of forwarding.',
    why: 'Old links, printed cards and people typing the address can land on the http version, where browsers show “Not secure”.',
    fix: 'Turn on “Force HTTPS” in your hosting panel or website builder, or add a 301 redirect from http to https.' })

  if (isHttps) add({ id: 'mixed', group: 'phone', weight: 6, title: 'Everything on the page loads securely',
    status: insecure.length ? 'fail' : 'pass',
    found: insecure.length ? `${insecure.length} file${insecure.length > 1 ? 's' : ''} still load over insecure http://, e.g. ${clip(insecure[0], 60)}` : 'Yes, all images, scripts and styles load over https.',
    why: 'Insecure files on a secure page get blocked by browsers (broken images, missing features) or remove the padlock.',
    fix: 'Change those file addresses from http:// to https:// (on WordPress, a plugin like Really Simple SSL fixes most of them).' })

  const enc = (p.headers['content-encoding'] ?? '').toLowerCase()
  const compressed = /gzip|br|zstd|deflate/.test(enc)
  add({ id: 'compression', group: 'phone', weight: 3, title: 'Page is compressed for mobile data',
    status: compressed || p.bytes < 15_000 ? 'pass' : 'warn',
    found: compressed ? `Yes (${enc}).` : p.bytes < 15_000 ? 'The page is small enough that it doesn’t matter.' : 'No compression, so the page downloads at full size.',
    why: 'Compression typically shrinks a page’s code to a fraction of its size, which matters on slow mobile data.',
    fix: 'Turn on gzip or Brotli compression in your hosting or CDN (Cloudflare does it automatically).' })

  add({ id: 'scripts', group: 'phone', weight: 5, title: 'Not overloaded with scripts and plugins',
    status: scriptSrcs.length > 25 ? 'fail' : scriptSrcs.length > 14 ? 'warn' : 'pass',
    found: `${scriptSrcs.length} script file${scriptSrcs.length === 1 ? '' : 's'} load on this page.`,
    why: 'Every chat widget, tracker, slider and plugin adds code the phone must download and run before the page responds smoothly.',
    fix: 'Remove widgets, trackers and plugins you don’t actually use. Keep one analytics tool and one chat option.' })

  const allImgs = root.querySelectorAll('img')
  if (allImgs.length >= 8) {
    const lazy = allImgs.filter((i) => (i.getAttribute('loading') ?? '').toLowerCase() === 'lazy' || i.hasAttribute('data-src') || i.hasAttribute('data-lazy-src')).length
    add({ id: 'lazy', group: 'phone', weight: 3, title: 'Photos below the screen load later',
      status: lazy >= allImgs.length / 3 ? 'pass' : 'warn',
      found: `${lazy} of ${allImgs.length} images wait until they’re scrolled to.`,
      why: 'Loading every photo at once makes the first screen slow. Photos further down can wait until the visitor scrolls.',
      fix: 'Add loading="lazy" to images below the first screen (most modern themes and builders have a setting for this).' })
  }

  // ── contact ──
  const tel = hrefs.find((h) => /^tel:/i.test(h))
  const shownNumber = tel ? undefined : bodyText.match(MOBILE)?.[0]
  add({ id: 'call', group: 'contact', weight: 12, title: 'Tap-to-call phone number',
    status: tel ? 'pass' : 'fail',
    found: tel ? `Yes: ${clip(decodeURIComponent(tel.replace(/^tel:/i, '')), 30)}` : shownNumber ? `Your number (${shownNumber.trim()}) is on the page, but it isn’t tappable, so phone visitors have to copy it by hand.` : 'No tap-to-call link, and no phone number found on the page.',
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

  const hasPrice = PRICE.test(bodyText)
  add({ id: 'prices', group: 'contact', weight: 5, title: 'Prices or price ranges shown',
    status: hasPrice ? 'pass' : 'warn',
    found: hasPrice ? 'Yes, the page mentions prices.' : 'No prices or price ranges found on the page.',
    why: 'When there’s no price, many visitors assume you’re expensive and leave without asking. Even “from ₹…” keeps them interested.',
    fix: 'Show prices, or at least “starting from” prices, for your main products or services.' })

  const hours = HOURS.test(bodyText) || /openingHours/i.test(ldRaw)
  add({ id: 'hours', group: 'contact', weight: 4, title: 'Opening hours or timings',
    status: hours ? 'pass' : 'warn',
    found: hours ? 'Yes, the page shows timings.' : 'No opening hours or timings found on the page.',
    why: '“Are you open now?” is one of the most common questions before someone calls or visits.',
    fix: 'Show your hours on the home page (and keep them matching your Google listing, including holidays).' })

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

  const privacy = links.some((l) => /privacy/i.test(`${l.href} ${l.label}`))
  add({ id: 'privacy', group: 'trust', weight: hasForm ? 4 : 2, title: 'Privacy policy',
    status: privacy ? 'pass' : 'warn',
    found: privacy ? 'Links to a privacy policy.' : hasForm ? 'You collect details through a form, but there’s no privacy policy link.' : 'No privacy policy link found.',
    why: 'If you collect names, phone numbers or payments, people (and payment gateways) expect to see how you handle their data.',
    fix: 'Add a short, honest privacy policy page and link it in the footer.' })

  const iconTag = Boolean(root.querySelector('link[rel~="icon" i]'))
  if (p.faviconFound !== undefined || iconTag) add({ id: 'favicon', group: 'trust', weight: 2, title: 'Icon in the browser tab',
    status: p.faviconFound || iconTag ? 'pass' : 'warn',
    found: p.faviconFound || iconTag ? 'Yes, the site has a tab icon.' : 'No tab icon, so browsers show a blank page icon.',
    why: 'A small detail, but it shows up in browser tabs, bookmarks and some Google results, and its absence looks unfinished.',
    fix: 'Upload your logo as a site icon (WordPress: Appearance → Customise → Site Identity).' })

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
