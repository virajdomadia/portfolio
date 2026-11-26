import type { Metadata } from 'next'
import Link from 'next/link'
import Checkup from '@/components/Checkup/Checkup'
import Footer from '@/components/Footer'
import { GROUPS, type Group } from '@/lib/checkup/report'
import { content } from '@/lib/content'
import { absolute } from '@/lib/site'
import { breadcrumbs } from '@/lib/seo'
import s from './page.module.css'

const path = '/tools/website-checkup'
const title = 'Free Website Check for Small Businesses'
const description = 'Is your website losing you customers? Free 20-second check: can Google find you, does it work on phones, can customers call or WhatsApp you in one tap. Get your top 3 fixes.'

export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  openGraph: { type: 'website', url: path, siteName: content.seo.siteName, locale: 'en_IN', title: `${title} — free, 20 seconds`, description },
  twitter: { card: 'summary_large_image', title, description },
}

const WHAT: Record<Group, string[]> = {
  google: ['The headline and description Google shows', 'Whether Google is allowed to list you at all', 'Main heading, sitemap and photo descriptions', 'Business details Google can read (for local results and Maps)'],
  phone: ['Phone-friendly layout', 'Secure connection (no “Not secure” warning)', 'How fast the server answers', 'Google’s own phone speed score'],
  contact: ['Tap-to-call number', 'WhatsApp chat button', 'Enquiry form or contact page', 'A clear “Book / Order / Call” button', 'Directions on Google Maps'],
  trust: ['Photo + title preview when shared on WhatsApp', 'Links to your Instagram and other pages', 'Reviews and testimonials', 'An up-to-date footer'],
}

const FAQ = [
  { q: 'Is it really free?', a: 'Yes. No sign-up, no email needed, no limit on how many of your own pages you check. I built it to help small businesses and to show what I do.' },
  { q: 'What does the score mean?', a: 'Each check is weighted by how much it affects enquiries: things like being visible on Google, working on a phone and having a tap-to-call number count most. 85+ is strong, 65–84 has a few leaks, under 65 is likely losing customers.' },
  { q: 'Does it change anything on my website?', a: 'No. It only reads your public home page, the same way Google or a visitor would. Nothing is changed and nothing is stored apart from a short cache so a shared report loads fast.' },
  { q: 'Why does it look for WhatsApp?', a: 'In India many customers would rather send a WhatsApp message than call or fill a form. A one-tap WhatsApp button is one of the cheapest ways to get more enquiries.' },
  { q: 'Can you fix the problems for me?', a: 'Yes. Send me your report on WhatsApp and I’ll reply with exactly how I’d fix your top 3 issues, free. If you want me to do the work, I’ll quote a fixed price first.' },
  { q: 'My speed result is missing. Why?', a: 'The speed part uses Google’s PageSpeed test, which sometimes takes too long or is busy. Run the check again in a minute and it usually comes through.' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebApplication', name: title, url: absolute(path), description, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }, author: { '@type': 'Person', name: content.person.name, url: absolute('/') } },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    (() => { const b = breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Website check', path }]) as Partial<ReturnType<typeof breadcrumbs>>; delete b['@context']; return b })(),
  ],
}

export default function Page() {
  return (
    <>
      <main id="main" tabIndex={-1} className={`wrap ${s.page}`}>
        <nav className={s.crumbs} aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Website check</li></ol></nav>
        <p className="mono">Free tool · For small businesses</p>
        <h1 className={s.h1}>Is your website <b>losing you customers?</b></h1>
        <p className={s.lede}>Paste your website address. In about 20 seconds you’ll see what Google, phone visitors and customers see, and the 3 fixes that will bring you the most enquiries.</p>
        <Checkup />

        <section className={s.what} aria-labelledby="what">
          <h2 id="what" className={s.h2}>What it checks</h2>
          <div className={s.grid}>
            {(Object.keys(GROUPS) as Group[]).map((g) => (
              <div key={g} className={s.card}>
                <h3>{GROUPS[g].title}</h3>
                <p>{GROUPS[g].blurb}</p>
                <ul>{WHAT[g].map((w) => <li key={w}>{w}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className={s.why} aria-labelledby="why">
          <h2 id="why" className={s.h2}>Why I built this</h2>
          <p>Most small-business websites I see look fine but quietly lose customers: no way to call in one tap, invisible on Google, or a link that shows up bare when someone shares it on WhatsApp. Owners rarely know, because nobody tells them. This check does, for free, in plain language.</p>
          <p>I’m <Link href="/">Viraj Domadia</Link>, a full-stack developer in Bengaluru. I build booking systems, websites and automation for businesses. <Link href="/guides">Read my guides</Link> or see <Link href="/#projects">things I’ve built</Link>.</p>
        </section>

        <section className={s.faq} aria-labelledby="faq">
          <h2 id="faq" className={s.h2}>Questions</h2>
          {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
