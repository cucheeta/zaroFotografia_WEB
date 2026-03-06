import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { weddingStories } from '../constants/data'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80'

/* ─── Individual wedding card ─────────────────────────────────────────── */
function WeddingCard({ story, index }) {
  const navigate = useNavigate()
  const col = index % 3
  const delay = col * 0.12

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <button
        onClick={() => navigate(`/boda/${story.slug}`)}
        className="group block w-full text-left relative overflow-hidden cursor-pointer"
        aria-label={`Ver historia de ${story.title}`}
      >
        {/* ── Image ── */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
            loading="lazy"
          />

          {/* Permanent vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

          {/* ── Text panel ── */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            {/* Gold line — clips up from below */}
            <div className="overflow-hidden mb-4">
              <div className="h-[1px] w-8 bg-[#c9a96e] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </div>

            {/* Couple names — clips up */}
            <div className="overflow-hidden mb-[6px]">
              <h3 className="font-serif text-[1.6rem] leading-tight text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
                {story.title}
              </h3>
            </div>

            {/* Location — clips up with more delay */}
            <div className="overflow-hidden mb-5">
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-white/55 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
                {story.location}
              </p>
            </div>

            {/* Ver historia — fades in */}
            <div className="overflow-hidden">
              <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-150">
                Ver historia
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function RealWeddingsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative h-[78vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Bodas Reales — Zaro Fotografía"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-[11px] tracking-[0.38em] uppercase text-[#c9a96e] mb-5"
          >
            Historias reales
          </motion.p>

          {/* Title — text reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-none"
            >
              Bodas Reales
            </motion.h1>
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-14 h-[1px] bg-[#c9a96e] mx-auto origin-left"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-7 font-sans text-white/60 text-[15px] leading-relaxed max-w-xl mx-auto"
          >
            Cada pareja me confía sus momentos más íntimos. Aquí encontrarás
            algunas de las bodas que he tenido el privilegio de documentar.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/35">
            Explorar
          </span>
          <div className="w-[1px] h-10 bg-white/15 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#c9a96e]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ height: '50%' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── Intro text ── */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-2 text-center md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[#1a1a1a]/55 text-[15px] leading-[1.85]"
        >
          Estas son solo algunas de las parejas cuyos momentos más preciados he
          tenido la suerte de capturar. Cada historia aquí es única, irrepetible
          y vivida con el corazón.
        </motion.p>
      </section>

      {/* ── Weddings grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {weddingStories.map((story, index) => (
            <WeddingCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </section>

    </div>
  )
}
