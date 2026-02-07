import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { aboutData } from '../../constants/data'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function About() {
  const [sectionRef, sectionVisible] = useIntersectionObserver()
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section
      id="about"
      className="bg-white py-20 text-charcoal md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Big centered title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center font-serif text-3xl uppercase tracking-[0.15em] md:text-4xl lg:text-5xl"
        >
          {aboutData.title}
        </motion.h2>

        {/* Two columns: image | text */}
        <div
          ref={sectionRef}
          className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
        >
          {/* Image with parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <motion.img
              style={{ y: imageY }}
              src={aboutData.image}
              alt="Zaro Fotógrafo"
              className="absolute inset-[-5%] h-[110%] w-[110%] object-cover"
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Subtitle */}
            <h3 className="font-serif text-sm uppercase tracking-[0.2em] text-charcoal/80 md:text-base">
              {aboutData.subtitle}
            </h3>

            {/* Bio */}
            {aboutData.bio.map((paragraph, i) => (
              <p key={i} className="mt-6 text-[15px] leading-relaxed text-charcoal/70">
                {paragraph}
              </p>
            ))}

            {/* Testimonial quote */}
            <blockquote className="mt-10">
              <p className="text-center font-serif text-[15px] leading-relaxed text-charcoal/80 italic">
                {aboutData.quote}
              </p>
              {aboutData.quoteAuthor && (
                <p className="mt-4 text-center font-serif text-sm tracking-wider text-charcoal/60">
                  — {aboutData.quoteAuthor} —
                </p>
              )}
            </blockquote>

            <div className="mt-10 text-center">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-block border border-charcoal/30 px-8 py-3 font-serif text-[13px] uppercase tracking-[0.15em] text-charcoal/80 transition-all duration-300 hover:bg-charcoal hover:text-white"
              >
                Conóceme
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
