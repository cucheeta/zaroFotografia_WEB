import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ImageSlider from '../ui/ImageSlider'
import { heroImages } from '../../constants/data'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-dvh overflow-hidden">
      {/* Background slider with parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <ImageSlider images={heroImages} interval={6000} />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-5xl font-light tracking-[0.2em] text-white md:text-7xl lg:text-8xl"
        >
          Ángel Zaro Fotografía
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-4 h-px w-24 bg-gold"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm tracking-[0.4em] text-white/80 uppercase md:text-base"
        >
          Fotografía de Bodas
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-white/50">Desliza</span>
          <div className="h-8 w-px bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
