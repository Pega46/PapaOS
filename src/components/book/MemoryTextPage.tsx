import { forwardRef } from 'react'
import type { Memory } from '../../models/Memory'

interface MemoryTextPageProps {
  memory: Memory
  pageNumber: number
}

export const MemoryTextPage = forwardRef<HTMLDivElement, MemoryTextPageProps>(
  ({ memory, pageNumber }, ref) => {
    return (
      <div className="flip-page flip-text-page" ref={ref}>
        <div className="flip-page-grain" aria-hidden="true" />
        <p className="book-kicker">{memory.dateLabel ?? memory.category ?? 'Recuerdo familiar'}</p>
        <h1>{memory.title}</h1>
        <div className="book-copy">
          <p>{memory.body}</p>
        </div>
        <footer className="book-signature">
          <span>{memory.authorName ?? 'Familia'}</span>
          <small>{memory.authorRelation ?? 'Legado Macara'}</small>
        </footer>
        <span className="flip-page-number">{pageNumber}</span>
      </div>
    )
  },
)

MemoryTextPage.displayName = 'MemoryTextPage'
