import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Carousel } from '../ui/Carousel'
import ZoomParallax from '../ui/ZoomParallax'
import { weddingStories, zoomParallaxImages } from '../../constants/data'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

function WeddingCard({ story }) {
  return (
    <Link to={`/boda/${story.slug}`} className="block">
      <div className="group relative h-[280px] w-full cursor-pointer overflow-hidden rounded-lg select-none md:h-[340px]">
        <img
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />
        <div className="absolute bottom-0 w-full p-4 md:p-6">
          <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-gold">
            {story.location}
          </p>
          <h3 className="font-serif text-xl text-white md:text-2xl">
            {story.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {story.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function Portfolio() {
  const [titleRef, titleVisible] = useIntersectionObserver()

  const slides = weddingStories.map((story) => (
    <WeddingCard key={story.id} story={story} />
  ))

  return (
    <section id="portfolio" className="bg-cream">
      {/* Zoom parallax intro */}
      <ZoomParallax images={zoomParallaxImages} />

      {/* Wedding stories carousel */}
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

        {/* Carousel - full width */}
        <div className="mx-auto max-w-5xl px-6">
          <Carousel
            slides={slides}
            options={{ loop: true, align: 'start' }}
          />
        </div>
      </div>
    </section>
  )
}
