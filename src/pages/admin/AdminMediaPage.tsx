import { AdminLayout } from '../../components/layout/AdminLayout'

export function AdminMediaPage() {
  return (
    <AdminLayout title="Media">
      <section className="admin-panel">
        <h2>Archivos</h2>
        <p>Preparado para ver peso, tipo, estado, asociacion y eliminar archivos no usados.</p>
        <p className="system-note">Buckets esperados: memory-media y system-assets.</p>
      </section>
    </AdminLayout>
  )
}
