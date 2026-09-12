import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About/About'
import ComingSoon from '@/components/ComingSoon'
import Stack from '@/components/Stack/Stack'
import Band from '@/components/Band'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer'
import { content } from '@/lib/content'

export default function Page() {
  const { person } = content
  const ld = { '@context': 'https://schema.org', '@type': 'Person', name: person.name, jobTitle: person.role, email: `mailto:${person.email}`, address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' }, sameAs: [person.github, person.linkedin] }
  return (
    <>
      <main>
        <Hero /><Marquee /><About /><ComingSoon /><Stack /><Band /><Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  )
}
