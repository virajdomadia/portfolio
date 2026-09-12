import { content } from '@/lib/content'
import s from './About.module.css'

/** Splits the quote into indexed words; the two names from quoteBold are wrapped in <b>. */
export default function Quote() {
  const { quote, quoteBold } = content.about
  const words = quote.split(' ')
  // mark which word indices belong to a bold phrase
  const boldIdx = new Set<number>()
  for (const phrase of quoteBold) {
    const parts = phrase.split(' ')
    for (let i = 0; i <= words.length - parts.length; i++) if (parts.every((p, k) => words[i + k].replace(/[.,]/g, '') === p)) for (let k = 0; k < parts.length; k++) boldIdx.add(i + k)
  }
  const nodes: React.ReactNode[] = []
  let run: number[] = []
  const flush = () => { if (run.length) { nodes.push(<b key={`b${run[0]}`}>{run.map((i) => <span key={i} className={s.w} style={{ ['--i' as string]: i }}>{words[i]}{i === run[run.length - 1] ? '' : ' '}</span>)}</b>); nodes.push(' '); run = [] } }
  words.forEach((w, i) => {
    if (boldIdx.has(i)) { run.push(i); return }
    flush(); nodes.push(<span key={i} className={s.w} style={{ ['--i' as string]: i }}>{w}</span>); nodes.push(' ')
  })
  flush()
  return <blockquote className={s.quote} data-progress="words" data-reveal="none" style={{ ['--n' as string]: words.length }}>{nodes}</blockquote>
}
