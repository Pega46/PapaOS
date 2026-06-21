import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Teaching } from '../../models/Teaching'

interface TeachingDetailProps {
  teaching: Teaching | null
  onClose: () => void
}

export function TeachingDetail({ teaching, onClose }: TeachingDetailProps) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!teaching) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, teaching])

  return (
    <AnimatePresence>
      {teaching && (
        <motion.div
          className="teaching-detail-backdrop"
          role="presentation"
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
        >
          <motion.aside
            layoutId={`teaching-leaf-${teaching.id}`}
            className="teaching-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="teaching-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
            transition={reduceMotion ? { duration: 0.12 } : { type: 'spring', duration: 0.48, bounce: 0.12 }}
          >
            <button className="detail-close" type="button" onClick={onClose} aria-label="Cerrar detalle">
              ×
            </button>
            <p className="tree-kicker">{teaching.branch}</p>
            <h2 id="teaching-detail-title">{teaching.title}</h2>
            <p>{teaching.body}</p>
            <footer>
              <span>{teaching.authorName ?? 'Familia'}</span>
              <small>{teaching.authorRelation ?? 'Legado Macara'}</small>
            </footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
