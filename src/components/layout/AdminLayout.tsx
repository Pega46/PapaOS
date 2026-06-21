import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { authController } from '../../controllers/authController'

const adminLinks = [
  ['/admin/dashboard', 'Dashboard'],
  ['/admin/recuerdos', 'Recuerdos'],
  ['/admin/ensenanzas', 'Ensenanzas'],
  ['/admin/mensajes', 'Mensajes'],
  ['/admin/media', 'Media'],
  ['/admin/usuarios', 'Usuarios'],
  ['/admin/configuracion', 'Configuracion'],
  ['/admin/comandos', 'Comandos'],
  ['/admin/auditoria', 'Auditoria'],
]

export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    authController.logout()
    navigate('/terminal')
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand" to="/terminal">
          <span className="brand-mark">M</span>
          <span>
            <strong>PapaOS</strong>
            <small>Admin</small>
          </span>
        </Link>
        <nav aria-label="Panel admin">
          {adminLinks.map(([href, label]) => (
            <Link className={location.pathname === href ? 'active' : ''} key={href} to={href}>
              {label}
            </Link>
          ))}
        </nav>
        <button className="ghost-button" type="button" onClick={handleLogout}>
          Cerrar sesion
        </button>
      </aside>
      <section className="admin-content">
        <header className="admin-header">
          <p>C:\FAMILIA\PAPAOS\ADMIN</p>
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  )
}
