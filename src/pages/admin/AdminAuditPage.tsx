import { AdminLayout } from '../../components/layout/AdminLayout'

export function AdminAuditPage() {
  return (
    <AdminLayout title="Auditoria">
      <section className="admin-panel">
        <h2>Registro de acciones</h2>
        <p>Preparado para actor, accion, entidad afectada, fecha y metadata del cambio.</p>
        <p className="system-note">Las acciones principales se deben persistir en audit_logs.</p>
      </section>
    </AdminLayout>
  )
}
