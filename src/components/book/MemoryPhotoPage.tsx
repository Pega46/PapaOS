import { forwardRef } from 'react'
import type { Memory } from '../../models/Memory'

interface MemoryPhotoPageProps {
  memory: Memory
  pageNumber: number
}

export const MemoryPhotoPage = forwardRef<HTMLDivElement, MemoryPhotoPageProps>(
  ({ memory, pageNumber }, ref) => {
    const hasMedia = Boolean(memory.mediaUrl)

    return (
      <div className="flip-page flip-photo-page" ref={ref}>
        <div className="flip-page-grain" aria-hidden="true" />
        <div className="album-photo-frame">
          {hasMedia && memory.mediaType === 'video' ? (
            <video src={memory.mediaUrl} controls />
          ) : hasMedia ? (
            <img src={memory.mediaUrl} alt={memory.title} />
          ) : (
            <div className="book-media-fallback">
              <span>PAPAOS</span>
              <p>Recuerdo guardado sin archivo multimedia.</p>
            </div>
          )}
        </div>
        <span className="flip-page-number">{pageNumber}</span>
      </div>
    )
  },
)

MemoryPhotoPage.displayName = 'MemoryPhotoPage'
