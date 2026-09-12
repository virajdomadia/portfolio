'use client'
import { useEffect, useState } from 'react'
import { content } from '@/lib/content'
import MobileMenu from './MobileMenu'
import s from './Nav.module.css'

const LINKS = [['About', '#about'], ['Projects', '#projects'], ['Stack', '#stack'], ['Contact', '#contact']] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [over, setOver] = useState(true)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const hero = document.querySelector('[data-hero]')
    const io = hero ? new IntersectionObserver((e) => setOver(e[0].isIntersecting), { rootMargin: '-64px 0px 0px 0px', threshold: 0 }) : null
    if (hero && io) io.observe(hero); else setOver(false)
    return () => { window.removeEventListener('scroll', onScroll); io?.disconnect() }
  }, [])
  const { person } = content
  return (
    <nav className={`${s.top} ${scrolled ? s.scrolled : ''} ${over ? `${s.over} over` : ''}`} aria-label="Primary">
      <div className={`wrap ${s.inner}`}>
        <a className={s.brand} href="#top" aria-label={person.name}><b className={s.mark} aria-hidden="true">VD</b><span className={s.name}>{person.name}</span></a>
        <div className={s.links}>{LINKS.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <div className={s.right}>
          <span className={s.pill}><i className={s.dot} aria-hidden="true" /><span>{person.available}</span></span>
          <a className={`btn sm ${s.hire}`} href="#contact"><span>Hire me</span></a>
          <MobileMenu />
        </div>
      </div>
    </nav>
  )
}
