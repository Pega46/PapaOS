import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Memory } from '../../models/Memory'
import { BookControls } from './BookControls'
import { BookPageSpread } from './BookPageSpread'
import { PageTurnLayer } from './PageTurnLayer'

interface PhysicalBookProps {
  memories: Memory[]
}

export function PhysicalBook({ memories }: PhysicalBookProps) {
  const [index, setIndex] = useState(0)
  const [turnKey, setTurnKey] = useState(0)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const [sourceIndex, setSourceIndex] = useState(0)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [hasSwappedPage, setHasSwappedPage] = useState(false)
  const memory = memories[index]
  const sourceMemory = memories[sourceIndex]
  const targetMemory = targetIndex === null ? null : memories[targetIndex]

  const goTo = (nextIndex: number, nextDirection: 'next' | 'previous') => {
    if (targetIndex !== null || nextIndex === index || nextIndex < 0 || nextIndex >= memories.length) return
    setDirection(nextDirection)
    setSourceIndex(index)
    setTargetIndex(nextIndex)
    setHasSwappedPage(false)
    setTurnKey((value) => value + 1)
  }

  const completeTurn = () => {
    if (targetIndex !== null) setIndex(targetIndex)
    setTargetIndex(null)
    setHasSwappedPage(false)
  }

  const swapPage = () => {
    if (targetIndex === null || hasSwappedPage) return
    setIndex(targetIndex)
    setHasSwappedPage(true)
  }

  if (!memory) {
    return (
      <div className="physical-book physical-book-empty" aria-label="Libro de recuerdos vacio">
        <section className="blank-book-page">
          <p>Aun no hay recuerdos publicados.</p>
          <span>El libro esta esperando sus primeras paginas.</span>
        </section>
      </div>
    )
  }

  return (
    <div className="book-stage">
      <motion.div
        className="physical-book"
        initial={{ opacity: 0, y: 24, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="physical-book-cover" aria-hidden="true" />
        <div className="page-stack page-stack-left" aria-hidden="true" />
        <div className="page-stack page-stack-right" aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.div
            key={memory.id}
            className="book-spread"
            initial={{ opacity: 0.68 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.72 }}
            transition={{ duration: 0.24 }}
          >
            <BookPageSpread memory={memory} />
          </motion.div>
        </AnimatePresence>
        <div className="book-spine" aria-hidden="true" />
        {turnKey > 0 && sourceMemory && targetMemory && (
          <PageTurnLayer
            turnKey={turnKey}
            direction={direction}
            currentMemory={sourceMemory}
            targetMemory={targetMemory}
            onMidTurn={swapPage}
            onComplete={completeTurn}
          />
        )}
      </motion.div>
      <BookControls
        currentPage={index + 1}
        totalPages={memories.length}
        onPrevious={() => goTo(index - 1, 'previous')}
        onNext={() => goTo(index + 1, 'next')}
      />
    </div>
  )
}
