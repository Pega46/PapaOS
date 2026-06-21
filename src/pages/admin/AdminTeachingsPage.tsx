import { useCallback } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { teachingController } from '../../controllers/teachingController'
import { useAsync } from '../../hooks/useAsync'

export function AdminTeachingsPage() {
  const loader = useCallback(() => teachingController.listPending(), [])
  const { data } = useAsync(loader, [])
  return (
    <AdminLayout title="Ensenanzas">
      <section className="admin-panel">
        <h2>Ramas y hojas</h2>
        <p>Crear ramas, crear hojas, editar, aprobar, rechazar, ocultar y ordenar.</p>
        {data.length === 0 ? <p className="system-note">No hay ensenanzas pendientes en este entorno.</p> : data.map((item) => <article className="admin-row" key={item.id}>{item.title}<button>Aprobar</button><button>Rechazar</button></article>)}
      </section>
    </AdminLayout>
  )
}
