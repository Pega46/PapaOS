import { Link } from 'react-router-dom'

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="empty-state">
      <p className="terminal-label">SIN CONTENIDO</p>
      <h2>{title}</h2>
      <p>{body}</p>
      <Link className="primary-button" to="/terminal">
        Volver a Terminal
      </Link>
    </section>
  )
}
