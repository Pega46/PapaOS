interface BookControlsProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
  disablePrevious?: boolean
  disableNext?: boolean
  firstPageActionLabel?: string
}

export function BookControls({ currentPage, totalPages, onPrevious, onNext, disablePrevious, disableNext, firstPageActionLabel }: BookControlsProps) {
  return (
    <nav className="book-controls" aria-label="Navegacion del libro">
      <button type="button" onClick={onPrevious} disabled={disablePrevious ?? currentPage === 1}>
        {currentPage === 1 && firstPageActionLabel ? firstPageActionLabel : 'Anterior'}
      </button>
      <span aria-live="polite">Pagina {currentPage} de {totalPages}</span>
      <button type="button" onClick={onNext} disabled={disableNext ?? currentPage === totalPages}>
        Siguiente
      </button>
    </nav>
  )
}
