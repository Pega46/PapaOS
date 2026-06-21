import type { Memory } from '../../models/Memory'

interface BookPageSpreadProps {
  memory: Memory
}

export function BookPageSpread({ memory }: BookPageSpreadProps) {
  const hasMedia = Boolean(memory.mediaUrl)

  return (
    <>
      <section className="left-page media-page" aria-label="Medio del recuerdo">
        <div className="page-corner page-corner-left" />
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
      </section>

      <section className="right-page text-page" aria-label="Texto del recuerdo">
        <div className="page-corner page-corner-right" />
        <p className="book-kicker">{memory.dateLabel ?? memory.category ?? 'Recuerdo familiar'}</p>
        <h1>{memory.title}</h1>
        <div className="book-copy">
          <p>{memory.body}</p>
        </div>
        <footer className="book-signature">
          <span>{memory.authorName ?? 'Familia'}</span>
          <small>{memory.authorRelation ?? 'Legado Macara'}</small>
        </footer>
      </section>
    </>
  )
}
