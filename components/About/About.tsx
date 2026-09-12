import { content } from '@/lib/content'
import SectionWord from '@/components/SectionWord'
import Quote from './Quote'
import Portrait from './Portrait'
import ExperienceStack from './ExperienceStack'
import Counters from './Counters'
import s from './About.module.css'

export default function About() {
  return (
    <>
      <SectionWord text="About" bold="out" />
      <section className={`wrap ${s.sec}`} id="about" data-parallax aria-labelledby="about-h">
        <h2 id="about-h" className={s.srOnly}>About</h2>
        <div className={s.rail} aria-hidden="true"><span>{content.about.rail} {content.about.rail}</span></div>
        <div className={s.grid}>
          <div className={s.left}><Quote /><Portrait /></div>
          <ExperienceStack />
        </div>
        <Counters />
      </section>
    </>
  )
}
