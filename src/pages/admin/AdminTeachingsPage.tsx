import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useAsync } from '../../hooks/useAsync'
import { createTeaching, deleteTeaching, listAdminTeachings, setTeachingStatus } from '../../services/adminCmsService'

export function AdminTeachingsPage() {
  const [revision, setRevision] = useState(0)
  const { data, loading, error } = useAsync(listAdminTeachings, [], revision)
  const refresh = () => setRevision((value) => value + 1)
  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await createTeaching({ branch: String(form.get('branch') ?? ''), title: String(form.get('title') ?? ''), body: String(form.get('body') ?? ''), authorName: String(form.get('authorName') ?? ''), authorRelation: String(form.get('authorRelation') ?? '') })
      event.currentTarget.reset(); toast.success('Nueva hoja añadida al Árbol.'); refresh()
    } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo guardar la enseñanza.') }
  }
  async function remove(id: string) { if (!window.confirm('¿Eliminar esta hoja?')) return; try { await deleteTeaching(id); refresh() } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo eliminar.') } }
  return (
    <AdminLayout title="Árbol de Enseñanzas">
      <section className="admin-panel">
        <h2>Nueva hoja para el Árbol</h2>
        <p>Las hojas creadas aquí aparecen únicamente en <strong>Árbol</strong>. El Árbol se enfoca en enseñanzas, por eso no incluye galería multimedia.</p>
        <form className="admin-form" onSubmit={handleCreate}>
          <label>Rama<select name="branch" required defaultValue=""><option value="" disabled>Selecciona una rama</option><option>Familia</option><option>Trabajo</option><option>Valores</option><option>Vida</option><option>Consejos</option><option>Ingeniería</option></select></label>
          <label>Título de la hoja<input name="title" required maxLength={120} /></label>
          <label>Autor<input name="authorName" maxLength={100} /></label>
          <label>Relación<input name="authorRelation" maxLength={80} /></label>
          <label className="admin-form-wide">Enseñanza<textarea name="body" required rows={5} maxLength={4000} /></label>
          <button className="primary-button" type="submit">Añadir al Árbol</button>
        </form>
      </section>
      <section className="admin-panel admin-panel-gap"><h2>Hojas existentes</h2>{error && <p className="system-note">{error}</p>}{loading ? <p className="system-note">Cargando hojas…</p> : data.length === 0 ? <p className="system-note">Aún no hay hojas creadas.</p> : data.map((item) => <article className="admin-row" key={item.id}><span><strong>{item.title}</strong><small>Rama: {item.branch} · {item.status}</small></span><span className="admin-actions"><button onClick={() => setTeachingStatus(item.id, item.status === 'hidden' ? 'approved' : 'hidden').then(refresh)}> {item.status === 'hidden' ? 'Mostrar' : 'Ocultar'}</button><button onClick={() => remove(item.id)}>Eliminar</button></span></article>)}</section>
    </AdminLayout>
  )
}
