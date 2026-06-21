import { useCallback } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { messageController } from '../../controllers/messageController'
import { useAsync } from '../../hooks/useAsync'

export function AdminMessagesPage() {
  const loader = useCallback(() => messageController.listPending(), [])
  const { data } = useAsync(loader, [])
  return (
    <AdminLayout title="Mensajes">
      <section className="admin-panel">
        <h2>Mensajes familiares</h2>
        <p>Revisar, corregir, aprobar, rechazar y destacar mensajes.</p>
        {data.length === 0 ? <p className="system-note">No hay mensajes pendientes en este entorno.</p> : data.map((item) => <article className="admin-row" key={item.id}>{item.body}<button>Aprobar</button><button>Rechazar</button></article>)}
      </section>
    </AdminLayout>
  )
}
