import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { Memory } from '../../models/Memory'

interface PageTurnLayerProps {
  turnKey: number
  direction: 'next' | 'previous'
  currentMemory: Memory
  targetMemory: Memory
  onMidTurn: () => void
  onComplete: () => void
}

export function PageTurnLayer({ turnKey, direction, currentMemory, targetMemory, onMidTurn, onComplete }: PageTurnLayerProps) {
  const reduceMotion = useReducedMotion()
  const hasReachedMidTurn = useRef(false)
  const isNext = direction === 'next'
  const animateRotate = isNext ? -178 : 178

  return (
    <motion.div
      key={turnKey}
      className={`turning-page turning-page-${direction}`}
      aria-hidden="true"
      initial={reduceMotion ? { opacity: 0 } : { rotateY: 0, opacity: 1 }}
      animate={reduceMotion ? { opacity: [0, 0.42, 0] } : { rotateY: animateRotate, opacity: [1, 1, 0.96] }}
      transition={reduceMotion ? { duration: 0.26 } : { duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
      onUpdate={(latest) => {
        if (typeof latest.rotateY === 'number' && Math.abs(latest.rotateY) > 88 && !hasReachedMidTurn.current) {
          hasReachedMidTurn.current = true
          onMidTurn()
        }
      }}
      onAnimationComplete={onComplete}
    >
      <div className="turning-page-face turning-page-front">
        <p>{currentMemory.dateLabel ?? currentMemory.category ?? 'Recuerdo familiar'}</p>
        <strong>{currentMemory.title}</strong>
      </div>
      <div className="turning-page-face turning-page-back">
        <p>{targetMemory.dateLabel ?? targetMemory.category ?? 'Recuerdo familiar'}</p>
        <strong>{targetMemory.title}</strong>
      </div>
    </motion.div>
  )
}
