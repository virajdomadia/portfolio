import type { Metadata } from 'next'
import { Anybody, Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'
import ScrollDriver from '@/components/ScrollDriver'
import Nav from '@/components/Nav'
import ProgressBar from '@/components/ProgressBar'
import { content } from '@/lib/content'
import { siteUrl } from '@/lib/site'
import './globals.css'

const display = Anybody({ subsets: ['latin'], axes: ['wdth'], weight: 'variable', variable: '--font-display', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' })
// mono only sets small labels, so it is not worth a preload ahead of the LCP text
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap', preload: false })

const { seo, person } = content
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: seo.title, template: `%s — ${person.name}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: person.name, url: siteUrl() }], creator: person.name, publisher: person.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'profile', url: '/', siteName: seo.siteName, locale: 'en_IN', title: seo.title, description: seo.description, firstName: person.first, lastName: person.last },
  twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined },
  category: 'technology',
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
