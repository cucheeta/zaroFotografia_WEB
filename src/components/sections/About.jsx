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
      className="bg-charcoal py-20 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={sectionRef}
          className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
        >
          {/* Image with parallax */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] overflow-hidden rounded"
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
          >
            <h2 className="font-serif text-4xl md:text-5xl">
              {aboutData.title}
            </h2>
            <div className="mt-4 h-px w-16 bg-gold" />
            <p className="mt-2 text-sm tracking-[0.3em] text-gold uppercase">
              {aboutData.subtitle}
            </p>

            {aboutData.bio.map((paragraph, i) => (
              <p key={i} className="mt-6 leading-relaxed text-white/70">
                {paragraph}
              </p>
            ))}

            <blockquote className="mt-8 border-l-2 border-gold pl-4 font-serif text-lg leading-relaxed text-white/60 italic">
              {aboutData.quote}
            </blockquote>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {aboutData.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl text-gold md:text-4xl">
                    {stat.number}
                  </p>
                  <p className="mt-2 text-xs leading-tight tracking-wider text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
