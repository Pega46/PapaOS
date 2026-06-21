import { useCallback } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { memoryController } from '../../controllers/memoryController'
import { useAsync } from '../../hooks/useAsync'

export function AdminMemoriesPage() {
  const loader = useCallback(() => memoryController.listPending(), [])
  const { data } = useAsync(loader, [])
  return (
    <AdminLayout title="Recuerdos">
      <section className="admin-panel">
        <h2>Revision de recuerdos</h2>
        <p>Crear, editar, aprobar, rechazar, ocultar, eliminar y ordenar recuerdos.</p>
        {data.length === 0 ? <p className="system-note">No hay recuerdos pendientes en este entorno.</p> : data.map((item) => <article className="admin-row" key={item.id}>{item.title}<button>Aprobar</button><button>Rechazar</button></article>)}
      </section>
    </AdminLayout>
  )
}
