import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Quote } from 'lucide-react'
import { testimonials } from '../../constants/data'

const AUTOPLAY_DELAY = 4000

function TestimonialCard({ testimonial, isActive }) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.92,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative flex h-full flex-col justify-between rounded-2xl border border-gold/20 bg-warm-gray p-8 md:p-10"
    >
      <Quote className="mb-6 h-8 w-8 text-gold/40" />

      <p className="mb-8 font-serif text-lg leading-relaxed text-cream/90 italic md:text-xl">
        "{testimonial.text}"
      </p>

      <div className="mt-auto">
        <div className="h-px w-12 bg-gold/40 mb-4" />
        <p className="font-serif text-base font-medium text-gold">
          {testimonial.name}
        </p>
        <p className="mt-1 text-sm text-cream/50">
          {testimonial.location}
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false },
    [Autoplay({ playOnInit: true, delay: AUTOPLAY_DELAY, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index) => {
      if (!emblaApi) return
      const autoplay = emblaApi.plugins()?.autoplay
      if (autoplay) autoplay.reset()
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-charcoal py-20 md:py-32"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="mx-auto mb-14 max-w-7xl px-6 text-center"
      >
        <h2 className="mt-4 font-serif text-3xl text-cream md:text-4xl">
          Testimonios 
        </h2>

        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          de parejas
        </span>
        <div className="mx-auto mt-4 h-px w-16 bg-gold" />
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {testimonials.map((testimonial, index) => (
              <div
                className="flex-[0_0_85%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_40%]"
                key={testimonial.id}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === selectedIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-gold'
                  : 'w-2.5 bg-gold/30 hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
