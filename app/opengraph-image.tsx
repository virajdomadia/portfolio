import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OG() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#1F1B10', color: '#F7E6A2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 64, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 24, letterSpacing: 4, opacity: .7 }}>FULL-STACK DEVELOPER · MUMBAI</div>
      <div style={{ fontSize: 140, fontWeight: 800, lineHeight: .9, display: 'flex', flexDirection: 'column' }}><span>VIRAJ</span><span style={{ color: '#FFC800' }}>DOMADIA</span></div>
      <div style={{ fontSize: 28, marginTop: 24, opacity: .85 }}>React · Node · MongoDB · Next.js — open to full-time & freelance</div>
    </div>, size)
}
