import Image from 'next/image'
import { content } from '@/lib/content'
import SectionWord from '@/components/SectionWord'
import s from './ProjectSlides.module.css'

/** One full-viewport sticky slide per project; ScrollDriver writes --c per slide and toggles the dots. */
export default function ProjectSlides() {
  const { projects, projectsNote, person } = content
  return (
    <>
      <SectionWord text="Projects" bold="jects" />
      <section className={s.slides} id="projects" aria-labelledby="projects-h">
        <h2 id="projects-h" className={s.srOnly}>Projects</h2>
        <div className={s.dots} aria-hidden="true">{projects.map((p) => <i key={p.slug} className={s.dot} data-dot />)}</div>
        {projects.map((p, i) => (
          <article key={p.slug} className={s.slide} data-slide id={`project-${p.slug}`}>
            <div className={s.bg}><Image src={p.image} alt={`Screenshot of the ${p.title} landing page`} fill sizes="100vw" priority={i === 0} /></div>
            <div className={`wrap ${s.txt}`}>
              <div>
                <span className={s.num}>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} · {p.category} · {p.status}</span>
                <h3 className={s.title}>{p.title}</h3>
                <p className={s.blurb}>{p.blurb}</p>
                <div className={s.tags}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
              <div className={s.acts}><a className="btn" href={p.live} target="_blank" rel="noreferrer"><span>Open live ↗</span></a><a className="btn o" href={p.repo} target="_blank" rel="noreferrer"><span>Source</span></a></div>
            </div>
          </article>
        ))}
      </section>
      <div className={`wrap ${s.after}`} data-reveal><span>{projectsNote.after}</span><a className="btn" href={person.github} target="_blank" rel="noreferrer"><span>{projectsNote.afterCta}</span></a></div>
    </>
  )
}
