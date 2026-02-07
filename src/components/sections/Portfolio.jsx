import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MasonryGrid from '../ui/MasonryGrid'
import ZoomParallax from '../ui/ZoomParallax'
import { portfolioImages, portfolioCategories, zoomParallaxImages } from '../../constants/data'
import { cn } from '../../utils/cn'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const ImageModal = lazy(() => import('../ui/ImageModal'))

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [selectedImage, setSelectedImage] = useState(null)
  const [titleRef, titleVisible] = useIntersectionObserver()

  const filteredImages =
    activeCategory === 'Todas'
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === activeCategory)

  return (
    <section id="portfolio" className="bg-cream">
      {/* Zoom parallax intro */}
      <ZoomParallax images={zoomParallaxImages} />

      {/* Portfolio gallery */}
      <div className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="font-serif text-4xl text-charcoal md:text-5xl">
              Portfolio
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          </motion.div>

          {/* Category filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'relative px-6 py-2.5 text-sm tracking-widest transition-all duration-300',
                  activeCategory === category
                    ? 'bg-charcoal text-white'
                    : 'bg-transparent text-charcoal/60 hover:text-charcoal'
                )}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 -z-10 bg-charcoal"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Masonry gallery with animation on filter change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MasonryGrid
                images={filteredImages}
                onImageClick={setSelectedImage}
              />
            </motion.div>
          </AnimatePresence>

          {/* Lightbox modal */}
          <Suspense fallback={null}>
            <ImageModal
              image={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
