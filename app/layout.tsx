import type { Metadata } from 'next'
import { Anybody, Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'
import ScrollDriver from '@/components/ScrollDriver'
import Nav from '@/components/Nav'
import ProgressBar from '@/components/ProgressBar'
import './globals.css'

const display = Anybody({ subsets: ['latin'], axes: ['wdth'], weight: 'variable', variable: '--font-display', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Viraj Domadia — Full-stack developer, Mumbai',
  description: 'Full-stack developer (React, Node, MongoDB, Next.js) in Mumbai. Previously Accenture and Venus Vacations. Open to full-time and freelance.',
  openGraph: { title: 'Viraj Domadia — Full-stack developer', description: 'React · Node · MongoDB · Next.js. Mumbai. Open to full-time and freelance.', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body id="top">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <ScrollDriver />
        <ProgressBar />
        <Nav />
        {children}
      </body>
    </html>
  )
}
