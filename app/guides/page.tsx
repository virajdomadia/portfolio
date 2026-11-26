import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { guides } from '@/lib/guides'
import { content } from '@/lib/content'
import s from './guides.module.css'

const description = 'Practical, no-jargon guides for small-business owners: getting found on Google, getting more enquiries from your website, and WhatsApp for business.'
export const metadata: Metadata = {
  title: 'Website guides for small businesses', description, alternates: { canonical: '/guides' },
  openGraph: { type: 'website', url: '/guides', siteName: content.seo.siteName, locale: 'en_IN', title: 'Website guides for small businesses', description },
}

export default function Page() {
  return (
    <>
      <main id="main" tabIndex={-1} className={`wrap ${s.page}`}>
        <nav className={s.crumbs} aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Guides</li></ol></nav>
        <p className="mono">For small-business owners</p>
        <h1 className={s.h1}>Guides</h1>
        <p className={s.intro}>{description}</p>
        <ul className={s.index}>
          <li><Link href="/tools/website-checkup"><span className="mono">Free tool</span><b>Website check: see your top 3 fixes in 20 seconds</b></Link></li>
          {guides.map((g) => <li key={g.slug}><Link href={`/guides/${g.slug}`}><span className="mono">{g.minutes} min read</span><b>{g.title}</b><span className={s.desc}>{g.description}</span></Link></li>)}
        </ul>
      </main>
      <Footer />
    </>
  )
}
