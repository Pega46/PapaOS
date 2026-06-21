import { motion } from 'motion/react'
import type { Teaching } from '../../models/Teaching'

interface TeachingLeafProps {
  teaching: Teaching
  index: number
  selected: boolean
  position: {
    left: string
    top: string
    rotate: number
  }
  onSelect: (teaching: Teaching) => void
}

export function TeachingLeaf({ teaching, index, selected, position, onSelect }: TeachingLeafProps) {
  return (
    <motion.button
      layoutId={`teaching-leaf-${teaching.id}`}
      className={`teaching-leaf${selected ? ' teaching-leaf-selected' : ''}`}
      style={{ left: position.left, top: position.top, rotate: `${position.rotate}deg` }}
      type="button"
      onClick={() => onSelect(teaching)}
      initial={{ opacity: 0, scale: 0.72, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.72 + index * 0.06, duration: 0.38 }}
      aria-label={`Abrir enseñanza ${teaching.title}`}
    >
      <span aria-hidden="true" />
    </motion.button>
  )
}
