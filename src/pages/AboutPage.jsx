import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { aboutData, contactData } from '../constants/data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const philosophy = [
  {
    title: 'Discreción',
    text: 'Me muevo entre los invitados sin interrumpir. Mi objetivo es que apenas notes la cámara, pero que no se escape ningún momento.',
  },
  {
    title: 'Luz natural',
    text: 'Huyo de los flashes intrusivos. Trabajo con la luz del entorno para que cada imagen tenga una calidez y una atmósfera únicas.',
  },
  {
    title: 'Emoción real',
    text: 'No dirijo poses artificiales. Espero, observo y capturo lo que ocurre de forma espontánea: las miradas, las lágrimas, las risas.',
  },
]

function StatItem({ number, label, visible, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="font-serif text-4xl text-gold md:text-5xl">{number}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/50">{label}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  const imageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  const [introRef, introVisible] = useIntersectionObserver()
  const [philosophyRef, philosophyVisible] = useIntersectionObserver()
  const [statsRef, statsVisible] = useIntersectionObserver()
  const [quoteRef, quoteVisible] = useIntersectionObserver()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-charcoal">
        <img
          src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
          alt="Ángel Zaro fotógrafo"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 text-[11px] uppercase tracking-[0.35em] text-gold"
          >
            Fotógrafo de bodas · Madrid
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl text-white md:text-6xl"
          >
            Sobre mí
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 h-px w-20 bg-gold"
          />
        </div>
      </section>

      {/* ── Intro: foto + bio ── */}
      <section className="bg-cream py-20 md:py-32">
        <div
          ref={introRef}
          className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-20 lg:px-12"
        >
          {/* Portrait */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -40 }}
            animate={introVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <motion.img
              style={{ y: imageY }}
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80"
              alt="Ángel Zaro"
              className="absolute inset-[-6%] h-[112%] w-[112%] object-cover"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={introVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Hola, soy</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">Ángel Zaro</h2>
            <div className="mt-5 h-px w-12 bg-gold" />

            {aboutData.bio.map((paragraph, i) => (
              <p
                key={i}
                className="mt-6 text-[15px] leading-relaxed text-charcoal/70"
              >
                {paragraph}
              </p>
            ))}

            <p className="mt-6 text-[15px] leading-relaxed text-charcoal/70">
              Creo que una boda debe vivirse sin preocuparse por la cámara. Me
              integro en el ambiente, aprendo los nombres de los familiares, me
              anticipo a los momentos y los capturo con la mayor naturalidad
              posible. El resultado: imágenes que te devuelven exactamente lo
              que sentiste ese día.
            </p>

            <a
              href={contactData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block border border-charcoal/30 px-8 py-3 font-serif text-[13px] uppercase tracking-[0.15em] text-charcoal/80 transition-all duration-300 hover:bg-charcoal hover:text-white"
            >
              Hablamos
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Filosofía ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div
            ref={philosophyRef}
            className="mb-14 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={philosophyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.3em] text-gold"
            >
              Mi manera de trabajar
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={philosophyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-serif text-3xl text-charcoal md:text-4xl"
            >
              Filosofía
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={philosophyVisible ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto mt-5 h-px w-12 bg-gold"
            />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={philosophyVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="border-t border-charcoal/10 pt-8"
              >
                <p className="font-serif text-lg text-charcoal">{item.title}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-charcoal/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-charcoal py-20 md:py-28">
        <div
          ref={statsRef}
          className="mx-auto grid max-w-4xl grid-cols-3 gap-8 px-6"
        >
          {aboutData.stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              label={stat.label}
              visible={statsVisible}
              delay={0.15 * i}
            />
          ))}
        </div>
      </section>

      {/* ── Cita ── */}
      <section className="bg-cream py-20 md:py-28">
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 30 }}
          animate={quoteVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <div className="mx-auto mb-8 h-px w-12 bg-gold" />
          <blockquote className="font-serif text-xl leading-relaxed text-charcoal/80 italic md:text-2xl">
            {aboutData.quote}
          </blockquote>
          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-charcoal/50">
            — {aboutData.quoteAuthor} —
          </p>
          <div className="mx-auto mt-8 h-px w-12 bg-gold" />
        </motion.div>
      </section>

      {/* ── Back link ── */}
      <section className="bg-cream pb-16 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-[0.15em] text-charcoal/50 transition-colors duration-300 hover:text-gold"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </section>
    </>
  )
}
