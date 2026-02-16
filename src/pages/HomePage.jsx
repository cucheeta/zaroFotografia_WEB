import Hero from '../components/sections/Hero'
import BestWeddings from '../components/sections/BestWeddings'
import About from '../components/sections/About'
import VideoSection from '../components/sections/VideoSection'
import Testimonials from '../components/sections/Testimonials'
import Contact from '../components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <VideoSection />
      <BestWeddings />
      <Testimonials />
      <Contact />
    </>
  )
}
