import { useState } from 'react'
import { toast } from 'sonner'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useAsync } from '../../hooks/useAsync'
import type { UserRole } from '../../models/Profile'
import { listProfiles, updateProfile } from '../../services/adminCmsService'

export function AdminUsersPage() {
  const [revision, setRevision] = useState(0)
  const { data, loading, error } = useAsync(listProfiles, [], revision)
  const refresh = () => setRevision((value) => value + 1)
  async function saveUser(id: string, role: UserRole, isActive: boolean) {
    try { await updateProfile(id, { role, isActive }); toast.success('Perfil actualizado.'); refresh() } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo actualizar el perfil.') }
  }
  return (
    <AdminLayout title="Usuarios">
      <section className="admin-panel">
        <h2>Acceso y permisos</h2>
        <p>Para crear una cuenta nueva, ve a <strong>Supabase → Authentication → Users → Add user</strong>. Al crearse, aparecerá aquí como <code>visitor</code>; desde esta pantalla puedes activar y asignar su rol.</p>
        <p className="system-note">Las contraseñas se crean y restablecen solo en Supabase Auth. Nunca se muestran ni se almacenan en PapaOS.</p>
      </section>
      <section className="admin-panel admin-panel-gap">
        <h2>Usuarios existentes</h2>
        {error && <p className="system-note">{error}</p>}
        {loading ? <p className="system-note">Cargando perfiles…</p> : data.length === 0 ? <p className="system-note">Aún no hay perfiles disponibles.</p> : data.map((user) => <article className="admin-row admin-user-row" key={user.id}><span><strong>{user.fullName}</strong><small>{user.email || user.id}</small></span><select defaultValue={user.role} onChange={(event) => saveUser(user.id, event.target.value as UserRole, user.isActive)}><option value="visitor">Visitante</option><option value="collaborator">Colaborador</option><option value="admin">Administrador</option><option value="super_admin">Super admin</option></select><button onClick={() => saveUser(user.id, user.role, !user.isActive)}>{user.isActive ? 'Desactivar' : 'Activar'}</button></article>)}
      </section>
    </AdminLayout>
  )
}
