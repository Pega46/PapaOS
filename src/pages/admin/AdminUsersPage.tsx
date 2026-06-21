import { AdminLayout } from '../../components/layout/AdminLayout'

export function AdminUsersPage() {
  return (
    <AdminLayout title="Usuarios">
      <section className="admin-panel">
        <h2>Roles</h2>
        <p>Roles preparados: super_admin, admin, collaborator y visitor.</p>
        <p className="system-note">Los cambios criticos de rol deben validarse con Supabase Auth y RLS.</p>
      </section>
    </AdminLayout>
  )
}
