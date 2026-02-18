import { useState, useEffect, useLayoutEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { weddingStories } from '../constants/data'
import AsymmetricGrid from '../components/ui/AsymmetricGrid'
import ImageModal from '../components/ui/ImageModal'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function WeddingDetail() {
  const { slug } = useParams()
  const story = weddingStories.find((s) => s.slug === slug)
  const [selectedImage, setSelectedImage] = useState(null)

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = ''
    })
  }, [slug])

  const [textRef, textVisible] = useIntersectionObserver()
  const [galleryRef, galleryVisible] = useIntersectionObserver()

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal">Boda no encontrada</h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm tracking-wider text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 text-[11px] uppercase tracking-[0.3em] text-gold"
          >
            {story.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-3xl text-white md:text-5xl"
          >
            {story.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 h-px w-20 bg-gold"
          />
        </div>
      </section>

      {/* Description */}
      <section className="bg-cream">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={textVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl px-6 py-16 md:py-24 text-center"
        >
          <h2 className="font-serif text-2xl text-charcoal md:text-3xl">
            La historia
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold" />
          <p className="mt-8 text-base leading-relaxed text-charcoal/70 md:text-lg">
            {story.fullDescription}
          </p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="bg-cream pb-16 md:pb-24">
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 30 }}
          animate={galleryVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto w-[75%]"
        >
          <h2 className="mb-10 text-center font-serif text-2xl text-charcoal md:text-3xl">
            Galería
          </h2>
          <div className="mx-auto mb-10 h-px w-12 bg-gold -mt-6" />
          <AsymmetricGrid
            images={story.gallery}
            onImageClick={setSelectedImage}
          />
        </motion.div>

        {/* Back link */}
        <div className="mx-auto mt-12 max-w-7xl px-4 md:px-6 text-center">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.15em] text-charcoal/60 transition-colors duration-300 hover:text-gold"
          >
            <ArrowLeft size={16} />
            Volver a bodas
          </Link>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  )
}
