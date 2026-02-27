import { useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

const WeddingDetail = lazy(() => import('./pages/WeddingDetail'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation()

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <ScrollToTop lenisRef={lenisRef} />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/boda/:slug" element={<WeddingDetail />} />
            <Route path="/sobre-mi" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
