import Link from 'next/link'
import { content } from '@/lib/content'
import s from './not-found.module.css'

export const metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <main className={`wrap ${s.nf}`}>
      <span className="mono">404</span>
      <h1 className={s.h1}>Nothing <b>here.</b></h1>
      <p className={s.p}>That page doesn’t exist. The whole site is one page anyway.</p>
      <div className={s.acts}><Link className="btn" href="/"><span>Back to the top</span></Link><a className="btn o" href={`mailto:${content.person.email}`}><span>Email Viraj</span></a></div>
    </main>
  )
}
