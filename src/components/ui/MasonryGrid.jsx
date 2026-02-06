import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

function MasonryItem({ image, index, onClick }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group mb-4 cursor-pointer overflow-hidden break-inside-avoid"
      onClick={() => onClick(image)}
    >
      <div className="relative overflow-hidden rounded">
        {/* Placeholder skeleton */}
        {!isVisible && (
          <div className="aspect-[3/4] w-full animate-pulse bg-charcoal/10" />
        )}
        {isVisible && (
          <img
            src={image.url}
            alt={image.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute bottom-0 w-full translate-y-2 p-4 transition-transform duration-500 group-hover:translate-y-0">
            <p className="font-serif text-lg text-white">{image.title}</p>
            <p className="text-sm text-white/70">{image.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MasonryGrid({ images, onImageClick }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((image, index) => (
        <MasonryItem
          key={image.id}
          image={image}
          index={index}
          onClick={onImageClick}
        />
      ))}
    </div>
  )
}
