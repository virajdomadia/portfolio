import { content } from '@/lib/content'
import s from './Contact.module.css'

/** Visible FAQ — the same four Q&As are emitted as FAQPage JSON-LD in lib/seo.ts, so the text must stay identical. */
export default function Faq() {
  return (
    <div className={s.box}>
      <h3 className={`mono ${s.faqH}`}>Quick answers</h3>
      <dl className={s.faq}>
        {content.faq.map((f) => <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>)}
      </dl>
    </div>
  )
}
