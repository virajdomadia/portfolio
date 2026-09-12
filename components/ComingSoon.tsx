import { content } from '@/lib/content'
import SectionWord from '@/components/SectionWord'
import s from './ComingSoon.module.css'

/** Projects placeholder until the first real project ships. Keeps the #projects anchor the nav and footer point at. */
export default function ComingSoon() {
  const { comingSoon, person } = content
  return (
    <>
      <SectionWord text="Projects" bold="jects" />
      <section className={`wrap ${s.sec}`} id="projects" aria-labelledby="projects-h">
        <div className={s.box} data-reveal data-progress="view">
          <span className={s.stamp} aria-hidden="true"><i />In the works · 2026</span>
          <div>
            <h2 id="projects-h" className={s.h2}>{comingSoon.heading} <b>{comingSoon.headingBold}</b></h2>
            <p className={s.lead}>{comingSoon.lead}</p>
          </div>
          <div className={s.aside}>
            <p className={s.note}>{comingSoon.note}</p>
            <a className="btn" href={person.employer.url} target="_blank" rel="noreferrer"><span>{comingSoon.cta} ↗</span></a>
          </div>
        </div>
      </section>
    </>
  )
}
