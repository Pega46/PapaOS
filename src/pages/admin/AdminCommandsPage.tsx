import { AdminLayout } from '../../components/layout/AdminLayout'
import { terminalCommands } from '../../data/mockData'

export function AdminCommandsPage() {
  return (
    <AdminLayout title="Comandos">
      <section className="admin-panel">
        <h2>Terminal commands</h2>
        {terminalCommands.map((command) => (
          <article className="admin-row" key={command.command}>
            <span>{command.command}</span>
            <small>{command.description}</small>
          </article>
        ))}
      </section>
    </AdminLayout>
  )
}
