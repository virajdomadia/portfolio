'use client'
import type { Tool } from '@/lib/content'
import { Icon } from '@/components/icons'
import s from './Stack.module.css'

export default function Pill({ tool, index }: { tool: Tool; index: number }) {
  return (
    // a label, not a link: the hover lift is decoration, so it stays out of the tab order
    <span className={`${s.pill} tpill`} data-key={tool.key} data-reveal style={{ ['--b' as string]: tool.brand, ['--k' as string]: index }}>
      <Icon name={tool.key} /><span>{tool.name}</span> <small>{tool.years} yr{tool.years > 1 ? 's' : ''}</small>
    </span>
  )
}
