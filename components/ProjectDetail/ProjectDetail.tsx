import Link from 'next/link'
import type { DetailProject } from '@/lib/projects'
import Gallery from './Gallery'
import FactsPanel from './FactsPanel'
import CaseStudy from './CaseStudy'
import Walkthrough from './Walkthrough'
import s from './ProjectDetail.module.css'

export default function ProjectDetail({ p }: { p: DetailProject }) {
  return (
    <main className={`wrap ${s.page}`}>
      <nav aria-label="Breadcrumb" className={s.crumbs}>
        <ol><li><Link href="/">Home</Link></li><li><Link href="/#projects">Projects</Link></li><li aria-current="page">{p.title}</li></ol>
      </nav>
      <div className={s.top}>
        <Gallery media={p.detail.media} title={p.title} />
        <FactsPanel p={p} />
      </div>
      <CaseStudy d={p.detail} />
      {p.detail.walkthrough && <Walkthrough id={p.detail.walkthrough} title={p.title} />}
      <p className={s.back}><Link className="btn o" href={`/#project-${p.slug}`}><span>← All projects</span></Link></p>
    </main>
  )
}
