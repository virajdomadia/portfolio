'use client'
import { useEffect, useRef, useState } from 'react'
import { content } from '@/lib/content'
import s from './MobileMenu.module.css'

const LINKS = [['About', '#about'], ['Projects', '#projects'], ['Stack', '#stack'], ['Contact', '#contact']] as const

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const kb = useRef(false), burger = useRef<HTMLButtonElement>(null), first = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { kb.current = true; if (e.key === 'Escape') setOpen(false) }
    const onPointer = () => { kb.current = false }
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onPointer)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer) }
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (kb.current) (open ? first.current : burger.current)?.focus()
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])
  const { person } = content
  return (
    <>
      <button ref={burger} className={s.burger} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}><i /><i /></button>
      <div className={s.menu} id="menu" aria-hidden={!open}>
        <div className={`wrap ${s.inner}`}>
          <div className={s.head}><span className="mono">Menu</span><span className="mono">{person.name}</span></div>
          <nav className={s.links} aria-label="Mobile">
            {LINKS.map(([label, href], i) => <a key={href} href={href} ref={i === 0 ? first : undefined} style={{ ['--i' as string]: i }} onClick={() => setOpen(false)}><span>{label}</span><small>{String(i + 1).padStart(2, '0')}</small></a>)}
          </nav>
          <div className={s.foot}>
            <a className="btn" href={`mailto:${person.email}`}><span>{person.email}</span></a>
            <div className={s.soc}><a href={person.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={person.resume} target="_blank" rel="noreferrer">Résumé ↗</a></div>
            <span className={`mono ${s.note}`}>Mumbai · IST · open to full-time & freelance</span>
          </div>
        </div>
      </div>
    </>
  )
}
