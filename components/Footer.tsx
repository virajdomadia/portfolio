import { content } from '@/lib/content'
import s from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={`wrap ${s.f}`}>
      <span>© {new Date().getFullYear()} {content.person.name}</span>
      <nav className={s.links} aria-label="Footer"><a href="#about">About</a><a href="#projects">Projects</a><a href="#stack">Stack</a><a href="#contact">Contact</a></nav>
      <span>{content.footer.tech}</span>
      <a href="#top" className={s.top} aria-label="Back to top">↑</a>
    </footer>
  )
}
