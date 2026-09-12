import { content } from '@/lib/content'
import InvertOnView from '@/components/InvertOnView'
import ContactForm from './ContactForm'
import CopyEmail from './CopyEmail'
import s from './Contact.module.css'

export default function Contact() {
  const { contact, person } = content
  return (
    <InvertOnView>
      <section className={`wrap ${s.sec}`} id="contact" aria-labelledby="contact-h">
        <div className={s.grid}>
          <div data-reveal>
            <span className="mono">Contact</span>
            <h2 id="contact-h" className={s.h2}>{contact.heading} <b>{contact.headingBold}</b></h2>
            <p className={s.lead}>{contact.lead}</p>
            <ContactForm />
          </div>
          <aside className={s.aside} data-reveal data-delay="1">
            <div className={s.box}><span className="mono">Email</span><p className={s.big}><a href={`mailto:${person.email}`}>{person.email}</a></p><CopyEmail email={person.email} /></div>
            <div className={s.box}><span className="mono">Elsewhere</span><div className={s.soc}><a href={person.github} target="_blank" rel="noreferrer">GitHub <span>{person.github.replace('https://', '')} ↗</span></a><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>{person.linkedin.replace('https://www.linkedin.com/', '')} ↗</span></a><a href={person.resume} target="_blank" rel="noreferrer">Résumé <span>PDF · 1 page ↗</span></a></div></div>
            <div className={s.box}><span className="mono">Practical</span><p className={s.p}>{contact.practical.map((l, i) => <span key={l}>{i > 0 && <br />}{l}</span>)}</p></div>
          </aside>
        </div>
      </section>
    </InvertOnView>
  )
}
