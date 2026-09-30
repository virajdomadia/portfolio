import Link from 'next/link'
import { content } from '@/lib/content'
import s from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={`wrap ${s.f}`}>
      <span>© {new Date().getFullYear()} {content.person.name}</span>
      <nav className={s.links} aria-label="Footer"><Link href="/#about">About</Link><Link href="/#projects">Projects</Link><Link href="/#stack">Stack</Link><Link href="/#contact">Contact</Link></nav>
      <span>{content.footer.tech}</span>
      <a href="#top" className={s.top} aria-label="Back to top">↑</a>
    </footer>
  )
}
