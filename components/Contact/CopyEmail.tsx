'use client'
import { useState } from 'react'
export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState('Copy email')
  return <button className="btn o sm" type="button" style={{ marginTop: 12 }} onClick={async () => { try { await navigator.clipboard.writeText(email); setLabel('Copied ✓'); setTimeout(() => setLabel('Copy email'), 1600) } catch { setLabel(email) } }}><span>{label}</span></button>
}
