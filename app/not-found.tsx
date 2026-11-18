import type { Metadata } from 'next'
import Link from 'next/link'
import { content } from '@/lib/content'
import s from './not-found.module.css'

// Next adds noindex to every 404 itself, so a robots entry here doubled the tag: null just clears the layout's
// index/follow. canonical: null drops the home canonical the layout would otherwise hand down to this page.
export const metadata: Metadata = { title: 'Page not found', robots: null, alternates: { canonical: null } }

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className={`wrap ${s.nf}`}>
      <span className="mono">404</span>
      <h1 className={s.h1}>Nothing <b>here.</b></h1>
      <p className={s.p}>That page doesn’t exist. Everything worth seeing starts on the home page.</p>
      <div className={s.acts}><Link className="btn" href="/"><span>Back to the top</span></Link><a className="btn o" href={`mailto:${content.person.email}`}><span>Email Viraj</span></a></div>
    </main>
  )
}
