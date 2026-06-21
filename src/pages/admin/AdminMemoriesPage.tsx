import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useAsync } from '../../hooks/useAsync'
import { createMemory, deleteMemory, listAdminMemories, setMemoryStatus } from '../../services/adminCmsService'

export function AdminMemoriesPage() {
  const [revision, setRevision] = useState(0)
  const { data, loading, error } = useAsync(listAdminMemories, [], revision)
  const refresh = () => setRevision((value) => value + 1)

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await createMemory({
        title: String(form.get('title') ?? ''), body: String(form.get('body') ?? ''),
        dateLabel: String(form.get('dateLabel') ?? ''), category: String(form.get('category') ?? ''),
        authorName: String(form.get('authorName') ?? ''), authorRelation: String(form.get('authorRelation') ?? ''),
        file: form.get('file') instanceof File ? form.get('file') as File : null,
      })
      event.currentTarget.reset(); toast.success('Nueva hoja añadida al Libro.'); refresh()
    } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo guardar el recuerdo.') }
  }

  async function changeStatus(id: string, status: 'approved' | 'hidden') {
    try { await setMemoryStatus(id, status); refresh() } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo actualizar.') }
  }
  async function remove(id: string) {
    if (!window.confirm('¿Eliminar este recuerdo del Libro?')) return
    try { await deleteMemory(id); refresh() } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo eliminar.') }
  }
  return (
    <AdminLayout title="Libro de Recuerdos">
      <section className="admin-panel">
        <h2>Nueva hoja para el Libro</h2>
        <p>Los recuerdos creados aquí aparecen en <strong>Libro</strong>. La foto o video se adjunta al recuerdo, no en un módulo separado.</p>
        <form className="admin-form" onSubmit={handleCreate}>
          <label>Título<input name="title" required maxLength={120} /></label>
          <label>Fecha o época<input name="dateLabel" placeholder="Ej. Navidad 2008" maxLength={80} /></label>
          <label>Categoría<input name="category" placeholder="Familia, viajes, trabajo..." maxLength={80} /></label>
          <label>Autor<input name="authorName" maxLength={100} /></label>
          <label>Relación<input name="authorRelation" placeholder="Hija, esposa, amigo..." maxLength={80} /></label>
          <label className="admin-form-wide">Historia<textarea name="body" required rows={5} maxLength={4000} /></label>
          <label className="admin-form-wide">Foto o video opcional (JPG, PNG, WEBP o MP4)<input name="file" type="file" accept="image/jpeg,image/png,image/webp,video/mp4" /></label>
          <button className="primary-button" type="submit">Añadir al Libro</button>
        </form>
      </section>
      <section className="admin-panel admin-panel-gap">
        <h2>Hojas del Libro</h2>
        {error && <p className="system-note">{error}</p>}
        {loading ? <p className="system-note">Cargando recuerdos…</p> : data.length === 0 ? <p className="system-note">Aún no hay recuerdos creados.</p> : data.map((item) => <article className="admin-row" key={item.id}><span><strong>{item.title}</strong><small>{item.category || 'Sin categoría'} · {item.status}</small></span><span className="admin-actions"><button onClick={() => changeStatus(item.id, item.status === 'hidden' ? 'approved' : 'hidden')}>{item.status === 'hidden' ? 'Mostrar' : 'Ocultar'}</button><button onClick={() => remove(item.id)}>Eliminar</button></span></article>)}
      </section>
    </AdminLayout>
  )
}
