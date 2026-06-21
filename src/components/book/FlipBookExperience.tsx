import HTMLFlipBook from 'react-pageflip'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import type { Memory } from '../../models/Memory'
import { BookCover } from './BookCover'
import { MemoryPhotoPage } from './MemoryPhotoPage'
import { MemoryTextPage } from './MemoryTextPage'

interface FlipBookExperienceProps {
  memories: Memory[]
}

interface FlipEvent {
  data: number
}

interface FlipStateEvent {
  data: 'user_fold' | 'fold_corner' | 'flipping' | 'read'
}

export function FlipBookExperience({ memories }: FlipBookExperienceProps) {
  const bookPageBlockRef = useRef<HTMLDivElement>(null)
  const flipLockRef = useRef(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const pages = useMemo(() => {
    return memories.flatMap((memory, index) => [
      <MemoryPhotoPage key={`${memory.id}-photo`} memory={memory} pageNumber={index * 2 + 1} />,
      <MemoryTextPage key={`${memory.id}-text`} memory={memory} pageNumber={index * 2 + 2} />,
    ])
  }, [memories])

  const lastSpreadStart = Math.max(0, pages.length - 2)

  if (memories.length === 0) {
    return (
      <div className="flip-book-stage">
        <div className="physical-book physical-book-empty" aria-label="Libro de recuerdos vacio">
          <section className="blank-book-page">
            <p>Aun no hay recuerdos publicados.</p>
            <span>El libro esta esperando sus primeras paginas.</span>
          </section>
        </div>
      </div>
    )
  }

  const syncFlipState = (event: FlipStateEvent) => {
    const isBusy = event.data === 'flipping'
    flipLockRef.current = isBusy
    setIsFlipping(isBusy)
  }

  const closeFromBookEdge = (event: MouseEvent<HTMLDivElement>) => {
    if (flipLockRef.current) return

    const bounds = bookPageBlockRef.current?.getBoundingClientRect()
    if (!bounds) return

    const clickedLeftSide = event.clientX < bounds.left + bounds.width / 2
    const isFirstPageExit = currentPage === 0 && clickedLeftSide
    const isLastPageExit = currentPage >= lastSpreadStart && !clickedLeftSide

    if (isFirstPageExit || isLastPageExit) setIsOpen(false)
  }

  return (
    <div className="flip-book-stage">
      <AnimatePresence initial={false} mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-cover"
            className="closed-book-stage"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, rotateY: -4 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="closed-book-cover closed-book-object"
              aria-label="Abrir Legado Macara"
              onClick={() => setIsOpen(true)}
            >
              <BookCover side="front" />
              <span className="closed-book-spine" aria-hidden="true" />
              <span className="closed-book-hint">Abrir libro</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="open-pages"
            className="open-book-stage"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, rotateX: 2 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, rotateX: 2 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`open-book-state open-book-object${isFlipping ? ' open-book-state-is-flipping' : ''}`}>
              <div className="book-shadow" aria-hidden="true" />
              <div className="book-page-block" ref={bookPageBlockRef} onClick={closeFromBookEdge}>
                <HTMLFlipBook
                  className="react-flip-book"
                  style={{}}
                  width={560}
                  height={720}
                  size="stretch"
                  minWidth={300}
                  maxWidth={680}
                  minHeight={430}
                  maxHeight={820}
                  startPage={0}
                  drawShadow
                  flippingTime={920}
                  usePortrait
                  startZIndex={5}
                  autoSize={false}
                  maxShadowOpacity={0.58}
                  showCover={false}
                  mobileScrollSupport
                  clickEventForward
                  useMouseEvents
                  swipeDistance={28}
                  showPageCorners
                  disableFlipByClick={false}
                  onFlip={(event: FlipEvent) => setCurrentPage(event.data)}
                  onChangeState={syncFlipState}
                >
                  {pages}
                </HTMLFlipBook>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
