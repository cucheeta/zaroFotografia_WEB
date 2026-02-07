import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import BestWeddings from './components/sections/BestWeddings'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <BestWeddings />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
