import { forwardRef } from 'react'

interface BookCoverProps {
  side: 'front' | 'back'
}

export const BookCover = forwardRef<HTMLDivElement, BookCoverProps>(({ side }, ref) => (
  <div className={`book-cover book-cover-${side}`} ref={ref} data-density="hard">
    <div className="book-cover-grain" aria-hidden="true" />
    <div className="book-cover-inset" aria-hidden="true" />
    {side === 'front' ? (
      <div className="book-cover-title">
        <span>Archivo familiar</span>
        <strong>Legado<br />Macara</strong>
        <small>PapaOS · recuerdos que permanecen</small>
      </div>
    ) : (
      <div className="book-cover-back-mark" aria-hidden="true">M</div>
    )}
  </div>
))

BookCover.displayName = 'BookCover'
