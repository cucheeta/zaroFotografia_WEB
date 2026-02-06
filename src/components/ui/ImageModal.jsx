import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-3xl text-white/80 transition-colors hover:text-white"
            aria-label="Cerrar"
          >
            &#x2715;
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image.fullUrl}
              alt={image.title}
              className="max-h-[85vh] max-w-full rounded object-contain"
            />
            <div className="mt-3 text-center">
              <p className="font-serif text-lg text-white">{image.title}</p>
              <p className="text-sm text-white/60">{image.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
