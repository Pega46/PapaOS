import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageShellProps {
  eyebrow: string
  title: string
  children: ReactNode
  actions?: ReactNode
}

export function PageShell({ eyebrow, title, children, actions }: PageShellProps) {
  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/terminal" aria-label="Volver a la terminal">
          <span className="brand-mark">M</span>
          <span>
            <strong>PapaOS</strong>
            <small>Macara Legacy Terminal</small>
          </span>
        </Link>
        <nav className="topnav" aria-label="Navegacion principal">
          <Link to="/libro">Libro</Link>
          <Link to="/arbol">Arbol</Link>
          <Link to="/mensajes">Mensajes</Link>
          <Link to="/colaborar">Colaborar</Link>
        </nav>
      </header>
      <section className="page-heading">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {actions}
      </section>
      {children}
    </main>
  )
}
