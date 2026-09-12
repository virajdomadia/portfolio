import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About/About'
import ProjectSlides from '@/components/ProjectSlides'

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <ProjectSlides />
    </main>
  )
}
