import { content, LAYERS } from '@/lib/content'
import SectionWord from '@/components/SectionWord'
import Pill from './Pill'
import StackInteractions from './StackInteractions'
import s from './Stack.module.css'

export default function Stack() {
  let k = 0
  return (
    <>
      <SectionWord text="Stack" bold="ack" />
      <section className={`wrap ${s.sec}`} id="stack" aria-labelledby="stack-h">
        <div className={s.intro} data-reveal><h2 id="stack-h" className={s.h2}>{content.stack.heading} <b>{content.stack.headingBold}</b></h2><p>{content.stack.note}</p></div>
        <StackInteractions>
          <div className={s.groups} data-groups>
            {LAYERS.map((l) => {
              const tools = content.tools.filter((t) => t.layer === l.key)
              return (
                <div key={l.key} className={s.grp}>
                  <div className={s.glab}><b>{l.label}</b><span>{tools.length}</span></div>
                  <div className={s.pills}>{tools.map((t) => <Pill key={t.key} tool={t} index={k++} />)}</div>
                </div>
              )
            })}
          </div>
        </StackInteractions>
      </section>
    </>
  )
}
