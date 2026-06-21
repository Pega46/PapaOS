import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { AdminLayout } from '../../components/layout/AdminLayout'
import { useAsync } from '../../hooks/useAsync'
import { listAdminCommands, saveCommand, toggleCommand } from '../../services/adminCmsService'

export function AdminCommandsPage() {
  const [revision, setRevision] = useState(0)
  const { data, loading, error } = useAsync(listAdminCommands, [], revision)
  const refresh = () => setRevision((value) => value + 1)
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await saveCommand({ command: String(form.get('command') ?? ''), description: String(form.get('description') ?? ''), response: String(form.get('response') ?? ''), enabled: true })
      event.currentTarget.reset(); toast.success('Comando guardado.'); refresh()
    } catch (caught) { toast.error(caught instanceof Error ? caught.message : 'No se pudo guardar el comando.') }
  }
  return (
    <AdminLayout title="Comandos">
      <section className="admin-panel">
        <h2>Personalizar la terminal</h2>
        <p>Crea comandos que respondan con tu propio texto. Los comandos del sistema como <code>ADMIN</code>, <code>HELP</code> y <code>DIR</code> permanecen protegidos.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Comando<input name="command" required placeholder="EJ. FRASE DE PAPA" maxLength={50} /></label>
          <label>Descripción<input name="description" required placeholder="Qué hace el comando" maxLength={160} /></label>
          <label className="admin-form-wide">Respuesta en terminal<textarea name="response" required rows={4} maxLength={2000} /></label>
          <button className="primary-button" type="submit">Guardar comando</button>
        </form>
      </section>
      <section className="admin-panel admin-panel-gap">
        <h2>Comandos activos</h2>
        {error && <p className="system-note">{error}</p>}
        {loading ? <p className="system-note">Cargando comandos…</p> : data.map((command) => <article className="admin-row" key={command.command}><span><strong>{command.command}</strong><small>{command.description}</small></span><button onClick={() => toggleCommand(command.command, !command.enabled).then(refresh)}>{command.enabled ? 'Desactivar' : 'Activar'}</button></article>)}
      </section>
    </AdminLayout>
  )
}
