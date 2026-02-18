import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '../../utils/cn'

// Deterministic portrait/landscape pattern per column for visual variety
const RATIO_PATTERN = [
  [9 / 16, 16 / 9, 9 / 16, 16 / 9, 9 / 16, 16 / 9],
  [16 / 9, 9 / 16, 16 / 9, 9 / 16, 16 / 9, 9 / 16],
  [9 / 16, 16 / 9, 16 / 9, 9 / 16, 9 / 16, 16 / 9],
]

function distributeToColumns(images, numCols) {
  const columns = Array.from({ length: numCols }, () => [])
  images.forEach((img, i) => {
    columns[i % numCols].push(img)
  })
  return columns
}

function AnimatedImage({ image, colIndex, rowIndex, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isLoading, setIsLoading] = useState(true)

  const ratio = RATIO_PATTERN[colIndex % 3][rowIndex % 6]

  return (
    <div
      ref={ref}
      className="relative w-full cursor-pointer overflow-hidden rounded-lg"
      style={{ aspectRatio: ratio }}
      onClick={() => onClick(image)}
    >
      <img
        src={image.url}
        alt={image.title}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={cn(
          'absolute inset-0 h-full w-full rounded-lg object-cover transition-all duration-1000 ease-in-out',
          isInView && !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 rounded-lg bg-charcoal/5 transition-opacity duration-500',
          isInView && !isLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  )
}

export default function AsymmetricGrid({ images, onImageClick }) {
  const columns = distributeToColumns(images, 3)

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((colImages, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {colImages.map((image, rowIndex) => (
            <AnimatedImage
              key={image.id}
              image={image}
              colIndex={colIndex}
              rowIndex={rowIndex}
              onClick={onImageClick}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
