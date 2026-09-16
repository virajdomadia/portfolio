import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Stack from '@/components/Stack/Stack'
import Band from '@/components/Band'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer'
import { jsonLdGraph } from '@/lib/seo'

export default function Page() {
  return (
    <>
      <main>
        <Hero /><Marquee /><About /><Projects /><Stack /><Band /><Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }} />
    </>
  )
}
