import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/shared/EmptyState'
import { PageShell } from '../components/layout/PageShell'
import { messageController } from '../controllers/messageController'
import { useAsync } from '../hooks/useAsync'

export function MessagesPage() {
  const loader = useCallback(() => messageController.listApproved(), [])
  const { data: messages, loading, error } = useAsync(loader, [])

  return (
    <PageShell
      eyebrow="MENSAJES FAMILIARES"
      title="Palabras aprobadas para Papa"
      actions={<Link className="ghost-button" to="/terminal">Volver a Terminal</Link>}
    >
      {loading && <p className="system-note">Cargando mensajes aprobados...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && messages.length === 0 && (
        <EmptyState title="Aun no hay contenido aprobado." body="Este modulo esta esperando sus primeras memorias." />
      )}
      <section className="message-grid">
        {messages.map((message) => (
          <article className={message.featured ? 'message-card featured' : 'message-card'} key={message.id}>
            <p>{message.body}</p>
            <footer>
              <strong>{message.authorName}</strong>
              <small>{message.authorRelation}</small>
            </footer>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
