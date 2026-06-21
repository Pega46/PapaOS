import { useCallback } from 'react'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { getAdminDashboardStats } from '../../controllers/adminController'
import { useAsync } from '../../hooks/useAsync'

export function AdminDashboardPage() {
  const loader = useCallback(() => getAdminDashboardStats(), [])
  const { data } = useAsync(loader, {
    pendingMemories: 0,
    pendingTeachings: 0,
    pendingMessages: 0,
    uploadedFiles: 0,
    publicationStatus: 'Cargando...',
  })

  return (
    <AdminLayout title="Dashboard">
      <section className="metric-grid">
        <article><span>{data.pendingMemories}</span><p>Recuerdos pendientes</p></article>
        <article><span>{data.pendingTeachings}</span><p>Ensenanzas pendientes</p></article>
        <article><span>{data.pendingMessages}</span><p>Mensajes pendientes</p></article>
        <article><span>{data.uploadedFiles}</span><p>Archivos subidos</p></article>
      </section>
      <section className="admin-panel">
        <h2>Estado de publicacion</h2>
        <p>{data.publicationStatus}</p>
        <p className="system-note">Accesos rapidos preparados para aprobar, rechazar, ocultar y auditar contenido.</p>
      </section>
    </AdminLayout>
  )
}
