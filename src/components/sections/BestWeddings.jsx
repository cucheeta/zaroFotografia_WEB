import { motion } from 'framer-motion'
import ExpandableGallery from '../ui/ExpandableGallery'
import ZoomParallax from '../ui/ZoomParallax'
import { weddingStories, zoomParallaxImages } from '../../constants/data'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function Portfolio() {
  const [titleRef, titleVisible] = useIntersectionObserver()

  const galleryImages = weddingStories.map((story) => story.image)

  return (
    <section id="portfolio" className="bg-cream">
      {/* Zoom parallax intro */}
      <ZoomParallax images={zoomParallaxImages} />

      {/* Wedding stories gallery */}
      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-10 text-center"
          >
            <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
              MIS MEJORES BODAS
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          </motion.div>
        </div>

        {/* Expandable Gallery */}
        <div className="mx-auto max-w-6xl px-6">
          <ExpandableGallery
            images={galleryImages}
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}
