import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { TeachingTree } from '../components/tree/TeachingTree'
import { teachingController } from '../controllers/teachingController'
import { useAsync } from '../hooks/useAsync'

export function TreePage() {
  const loader = useCallback(() => teachingController.listApproved(), [])
  const { data: teachings, loading, error } = useAsync(loader, [])

  return (
    <main className="public-screen tree-screen">
      <div className="tree-background" aria-hidden="true" />
      <Link className="back-to-terminal tree-back-link" to="/terminal">Volver a Terminal</Link>
      <div className="tree-atmosphere">
        {loading && <p className="system-note">Cargando hojas aprobadas...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <TeachingTree teachings={teachings} />}
      </div>
    </main>
  )
}
