import { AdminLayout } from '../../components/layout/AdminLayout'
import { defaultSettings } from '../../services/settingsService'

export function AdminSettingsPage() {
  return (
    <AdminLayout title="Configuracion">
      <section className="admin-panel settings-list">
        <h2>Parametros editables</h2>
        <label>Nombre visible<input defaultValue={defaultSettings.visibleName} /></label>
        <label>Subtitulo<input defaultValue={defaultSettings.subtitle} /></label>
        <label>Mensaje de gracias<textarea defaultValue={defaultSettings.thanksMessage} rows={5} /></label>
        <p className="system-note">Guardar estos valores en app_settings cuando Supabase este conectado.</p>
      </section>
    </AdminLayout>
  )
}
