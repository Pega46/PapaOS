import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="error-page">
      <section>
        <p className="terminal-label">ERROR 404</p>
        <h1>La ruta solicitada no existe en PapaOS.</h1>
        <p>Escriba HELP desde la terminal para ver los modulos disponibles.</p>
        <Link className="primary-button" to="/terminal">Volver a Terminal</Link>
      </section>
    </main>
  )
}
