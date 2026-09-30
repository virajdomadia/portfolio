import { ImageResponse } from 'next/og'
import { detailProjects, getDetailProject } from '@/lib/projects'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export function generateStaticParams() { return detailProjects().map((p) => ({ slug: p.slug })) }

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const p = getDetailProject((await params).slug)!
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', background: '#1F1B10', color: '#F7E6A2', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 64, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 24, letterSpacing: 4, opacity: .7 }}>{`${p.category.toUpperCase()} · VIRAJ DOMADIA`}</div>
      <div style={{ fontSize: 150, fontWeight: 800, lineHeight: .9, color: '#FFC800' }}>{p.title.toUpperCase()}</div>
      <div style={{ fontSize: 30, marginTop: 24, opacity: .85 }}>{p.detail.pitch}</div>
    </div>, size)
}
