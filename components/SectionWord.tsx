/** Giant outlined section word. --chars lets the CSS cap the font size so the word never overflows the viewport. */
export default function SectionWord({ text, bold }: { text: string; bold: string }) {
  const i = text.indexOf(bold)
  const before = i >= 0 ? text.slice(0, i) : text, after = i >= 0 ? text.slice(i + bold.length) : ''
  const chars = text.replace(/\s/g, '').length
  return <div className="wrap"><div className="big" data-progress="view" aria-hidden="true" style={{ ['--chars' as string]: chars }}>{before}{i >= 0 && <b>{bold}</b>}{after}</div></div>
}
