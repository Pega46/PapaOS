import { Link } from 'react-router-dom'

export function UnauthorizedPage() {
  return (
    <main className="error-page">
      <section>
        <p className="terminal-label">ACCESO DENEGADO</p>
        <h1>Este modulo requiere permisos administrativos.</h1>
        <Link className="primary-button" to="/terminal">Volver a Terminal</Link>
      </section>
    </main>
  )
}
