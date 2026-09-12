import { ImageResponse } from 'next/og'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'
// The nav's "VD" chip as the site icon (shows next to the site name in mobile search results).
export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#1F1B10', color: '#F7E6A2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 300, fontWeight: 800, letterSpacing: -12, fontFamily: 'sans-serif' }}>VD</div>, size)
}
