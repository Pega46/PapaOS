import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FlipBookExperience } from '../components/book/FlipBookExperience'
import { memoryController } from '../controllers/memoryController'
import { useAsync } from '../hooks/useAsync'

export function BookPage() {
  const loader = useCallback(() => memoryController.listApproved(), [])
  const { data: memories, loading, error } = useAsync(loader, [])

  return (
    <main className="public-screen book-screen">
      <div className="book-background" aria-hidden="true" />
      <Link className="back-to-terminal" to="/terminal">Volver a Terminal</Link>
      <div className="book-atmosphere">
        {loading && <p className="system-note">Cargando recuerdos aprobados...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <FlipBookExperience memories={memories} />}
      </div>
    </main>
  )
}
