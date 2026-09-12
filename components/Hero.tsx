import Image from 'next/image'
import { content } from '@/lib/content'
import s from './Hero.module.css'

function Letters({ text }: { text: string }) {
  return <>{[...text].map((c, i) => <span key={i} className={s.ch} data-ch style={{ ['--i' as string]: i }}>{c}</span>)}</>
}

export default function Hero() {
  const { person, hero } = content
  return (
    <div className={s.pin} data-progress="sticky" data-hero>
      <header className={s.hero}>
        <div className={s.bg}><Image src="/images/hero-desk.jpg" alt="Viraj at a desk with three monitors, building a portfolio site" fill priority sizes="100vw" /></div>
        <div className={s.veil} />
        <div className={s.frame} aria-hidden="true"><i className={s.tl}>{hero.corners[0]}</i><i className={s.tr}>{hero.corners[1]}</i><i className={s.bl}>{hero.corners[2]}</i><i className={s.br}>{hero.corners[3]}</i></div>
        <div className={`wrap ${s.inner}`}>
          <p className={s.eyebrow}>{hero.eyebrow.map((t, i) => <span key={t}>{i > 0 && <i>· </i>}{t}</span>)}</p>
          <h1 className={s.name}><span className={`${s.line} ${s.l1}`}><Letters text={person.first} /></span><span className={`${s.line} ${s.l2}`}><Letters text={person.last} /></span></h1>
          <div className={s.row}>
            <div className={s.col}>
              <p className={s.lede}>{hero.lede}</p>
              <div className={s.cta}><a className="btn" href="#projects"><span>See the projects</span></a><a className="btn o" href="#contact"><span>Hire me</span></a></div>
              <div className={s.socials}><a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${person.email}`}>Email ↗</a><a href={person.resume} target="_blank" rel="noreferrer">Résumé (PDF) ↗</a></div>
            </div>
            <div className={s.stats}>{hero.stats.map((st) => <div key={st.label}><b>{st.n}</b>{st.label}</div>)}</div>
          </div>
        </div>
        <div className={s.cue} aria-hidden="true"><span>scroll</span><i /></div>
      </header>
    </div>
  )
}
