import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About/About'
import ProjectSlides from '@/components/ProjectSlides'
import Stack from '@/components/Stack/Stack'
import Band from '@/components/Band'

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <ProjectSlides />
      <Stack />
      <Band />
    </main>
  )
}
