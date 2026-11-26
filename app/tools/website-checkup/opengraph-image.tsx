import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Free website check for small businesses'
export default function OG() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#F7E6A2', color: '#1F1B10', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 26, letterSpacing: 4, opacity: .7 }}>FREE · 20 SECONDS · NO SIGN-UP</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 800, lineHeight: .95 }}>
        <span>IS YOUR WEBSITE</span><span style={{ color: '#1C3BFF' }}>LOSING YOU</span><span style={{ color: '#1C3BFF' }}>CUSTOMERS?</span>
      </div>
      <div style={{ display: 'flex', gap: 18, fontSize: 28 }}>
        {['Google', 'Phone', 'Call & WhatsApp', 'Trust'].map((t) => <span key={t} style={{ background: '#1F1B10', color: '#F7E6A2', padding: '10px 18px' }}>{t}</span>)}
      </div>
    </div>, size)
}
