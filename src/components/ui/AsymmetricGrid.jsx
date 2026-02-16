import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

function GalleryImage({ image, index, onClick }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="cursor-pointer overflow-hidden"
      onClick={() => onClick(image)}
    >
      <img
        src={image.url}
        alt={image.title}
        loading="lazy"
        className="w-full max-h-[50vh] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
      />
    </motion.div>
  )
}

export default function AsymmetricGrid({ images, onImageClick }) {
  // Pattern: full-width, pair, full-width, pair, ...
  // Groups images into rows following Jorge Sastre editorial style
  const rows = []
  let i = 0

  while (i < images.length) {
    // Odd row index → full width
    if (rows.length % 3 === 0) {
      rows.push({ type: 'full', images: [images[i]] })
      i += 1
    // Even row index → pair side by side
    } else if (rows.length % 3 === 1 && i + 1 < images.length) {
      rows.push({ type: 'pair', images: [images[i], images[i + 1]] })
      i += 2
    // Third → full width again
    } else {
      rows.push({ type: 'full', images: [images[i]] })
      i += 1
    }
  }

  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {rows.map((row, rowIndex) => {
        if (row.type === 'full') {
          return (
            <GalleryImage
              key={row.images[0].id}
              image={row.images[0]}
              index={rowIndex}
              onClick={onImageClick}
            />
          )
        }

        return (
          <div key={`pair-${rowIndex}`} className="grid grid-cols-2 gap-1 md:gap-2">
            {row.images.map((image) => (
              <GalleryImage
                key={image.id}
                image={image}
                index={rowIndex}
                onClick={onImageClick}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
