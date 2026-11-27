import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import { guides, getGuide, type Block } from '@/lib/guides'
import { content } from '@/lib/content'
import { absolute } from '@/lib/site'
import { breadcrumbs } from '@/lib/seo'
import s from '../guides.module.css'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
// the next five guides, wrapping round: every guide is linked from five others, and lists stay short
const related = (slug: string) => { const i = guides.findIndex((x) => x.slug === slug); return Array.from({ length: Math.min(5, guides.length - 1) }, (_, k) => guides[(i + k + 1) % guides.length]) }
export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = getGuide((await params).slug)
  if (!g) return {}
  const path = `/guides/${g.slug}`
  return {
    title: g.title, description: g.description, alternates: { canonical: path },
    openGraph: { type: 'article', url: path, siteName: content.seo.siteName, locale: 'en_IN', title: g.title, description: g.description, modifiedTime: g.updated, images: ['/tools/website-checkup/opengraph-image'] },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description },
  }
}

function Render({ b }: { b: Block }) {
  if ('p' in b) return <p>{b.p}</p>
  if ('list' in b) return <ul>{b.list.map((x) => <li key={x}>{x}</li>)}</ul>
  if ('steps' in b) return <ol>{b.steps.map((x) => <li key={x}>{x}</li>)}</ol>
  if ('code' in b) return <pre className={s.code}><code>{b.code}</code></pre>
  return <p className={s.tip}><b>Tip:</b> {b.tip}</p>
}

export default async function Page({ params }: Props) {
  const g = getGuide((await params).slug)
  if (!g) notFound()
  const path = `/guides/${g.slug}`
  const crumbs = breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }, { name: g.title, path }]) as Partial<ReturnType<typeof breadcrumbs>>
  delete crumbs['@context']
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: g.title, description: g.description, dateModified: g.updated, datePublished: g.updated, mainEntityOfPage: absolute(path), author: { '@type': 'Person', name: content.person.name, url: absolute('/') }, image: absolute('/tools/website-checkup/opengraph-image') },
    crumbs,
  ] }
  return (
    <>
      <main id="main" tabIndex={-1} className={`wrap ${s.page}`}>
        <nav className={s.crumbs} aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li><Link href="/guides">Guides</Link></li><li aria-current="page">{g.title}</li></ol></nav>
        <article className={s.article}>
          <p className="mono">Guide · {g.minutes} min read · Updated {new Date(g.updated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <h1 className={s.h1}>{g.title}</h1>
          <p className={s.intro}>{g.intro}</p>
          {g.sections.map((sec) => (
            <section key={sec.h}>
              <h2>{sec.h}</h2>
              {sec.body.map((b, i) => <Render key={i} b={b} />)}
            </section>
          ))}
          <aside className={s.cta}>
            <p className="mono">Free tool</p>
            <p className={s.ctaLine}>See what’s costing you customers. Paste your website and get your top 3 fixes in about 20 seconds.</p>
            <Link className="btn" href="/tools/website-checkup"><span>Check my website free</span></Link>
          </aside>
          <nav className={s.more} aria-labelledby="more-h">
            <h2 id="more-h">More guides</h2>
            <ul>{related(g.slug).map((o) => <li key={o.slug}><Link href={`/guides/${o.slug}`}>{o.title}</Link></li>)}</ul>
            <p><Link href="/guides">All {guides.length} guides →</Link></p>
          </nav>
          <p className={s.by}>Written by <Link href="/">{content.person.name}</Link>, a full-stack developer in {content.person.city} who builds websites, booking systems and automation for small businesses.</p>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  )
}
