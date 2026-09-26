import Image from 'next/image'
import { content } from '@/lib/content'
import SectionWord from '@/components/SectionWord'
import s from './Projects.module.css'

/** Six case rows on ink rules: framed screenshot one side, title / story / stack / links the other, sides alternating. */
export default function Projects() {
  const { projects, projectsNote, person } = content
  const total = String(projects.length).padStart(2, '0')
  return (
    <>
      <SectionWord text="Projects" bold="jects" />
      <section className={`wrap ${s.sec}`} id="projects" aria-labelledby="projects-h">
        <h2 id="projects-h" className={s.srOnly}>Projects</h2>
        {projects.map((p, i) => {
          const n = String(i + 1).padStart(2, '0')
          return (
            <article key={p.slug} className={s.case} id={`project-${p.slug}`} data-reveal>
              <div className={s.fr}>
                <span className={s.ghost} aria-hidden="true">{n}</span>
                <div className={s.frame}>
                  <div className={s.bar} aria-hidden="true"><i /><i /><i /><span>{new URL(p.live).host}</span></div>
                  <Image src={p.image} alt={`Screenshot of ${p.title}`} width={1600} height={1000} sizes="(max-width: 900px) 100vw, 640px" />
                </div>
              </div>
              <div>
                <span className={s.num}>{n} / {total} <em>· {p.category} · {p.status}</em></span>
                <h3 className={s.title}>{p.title}</h3>
                <p className={s.blurb}>{p.blurb}</p>
                <div className={s.tags}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
                <div className={s.acts}><a className="btn" href={p.live} target="_blank" rel="noreferrer"><span>Open live ↗</span></a><a className="btn o" href={p.repo} target="_blank" rel="noreferrer"><span>Source</span></a></div>
              </div>
            </article>
          )
        })}
      </section>
      <div className={`wrap ${s.after}`} data-reveal><span>{projectsNote.after}</span><a className="btn" href={person.github} target="_blank" rel="noreferrer"><span>{projectsNote.afterCta}</span></a></div>
    </>
  )
}
