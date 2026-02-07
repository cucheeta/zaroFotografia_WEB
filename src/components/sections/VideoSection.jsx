import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      data-hide-navbar
      className="relative h-screen w-full overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3327888/3327888-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-black/40"
      />
    </section>
  )
}
