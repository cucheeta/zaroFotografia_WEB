import { motion } from 'framer-motion'
import { contactData } from '../../constants/data'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const BG_IMAGE =
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80'

export default function Contact() {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <section
      id="contact"
      className="relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <div className="h-px w-10 bg-gold/50" />
          <svg
            className="h-4 w-4 text-gold/60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <div className="h-px w-10 bg-gold/50" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Hagamos realidad{' '}
          <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
            tu boda soñada
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-4 max-w-lg text-sm leading-relaxed font-light text-white/60 md:text-base"
        >
          Cada boda es única y merece ser capturada con pasión y autenticidad.
          Escríbeme y hablemos de tu gran día.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <a
            href={contactData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-9 py-3.5 text-sm font-medium tracking-widest text-charcoal uppercase transition-all duration-500 hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
          >
            <span className="relative z-10">Hablemos</span>
            <span className="absolute inset-0 z-0 translate-y-full bg-white/10 transition-transform duration-500 group-hover:translate-y-0" />
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10"
        >
          <a
            href={`mailto:${contactData.email}`}
            className="flex items-center gap-2 text-xs text-white/40 transition-colors duration-300 hover:text-gold"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {contactData.email}
          </a>
          <a
            href={`tel:${contactData.phone}`}
            className="flex items-center gap-2 text-xs text-white/40 transition-colors duration-300 hover:text-gold"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {contactData.phone}
          </a>
          <span className="flex items-center gap-2 text-xs text-white/40">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {contactData.location}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
