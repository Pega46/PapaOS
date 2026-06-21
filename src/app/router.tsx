import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState, type ReactNode } from 'react'
import { authController } from '../controllers/authController'
import { AdminAuditPage } from '../pages/admin/AdminAuditPage'
import { AdminCommandsPage } from '../pages/admin/AdminCommandsPage'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { AdminLoginPage } from '../pages/admin/AdminLoginPage'
import { AdminMediaPage } from '../pages/admin/AdminMediaPage'
import { AdminMemoriesPage } from '../pages/admin/AdminMemoriesPage'
import { AdminMessagesPage } from '../pages/admin/AdminMessagesPage'
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage'
import { AdminTeachingsPage } from '../pages/admin/AdminTeachingsPage'
import { AdminUsersPage } from '../pages/admin/AdminUsersPage'
import { BookPage } from '../pages/BookPage'
import { BootPage } from '../pages/BootPage'
import { CollaboratePage } from '../pages/CollaboratePage'
import { MessagesPage } from '../pages/MessagesPage'
import { TerminalPage } from '../pages/TerminalPage'
import { TreePage } from '../pages/TreePage'
import { NotFoundPage } from '../pages/errors/NotFoundPage'
import { UnauthorizedPage } from '../pages/errors/UnauthorizedPage'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    let mounted = true
    authController.getSession()
      .then((session) => {
        if (mounted) setIsAllowed(Boolean(session))
      })
      .catch(() => {
        if (mounted) setIsAllowed(false)
      })
      .finally(() => {
        if (mounted) setIsLoading(false)
      })

    return () => { mounted = false }
  }, [])

  if (isLoading) return <main className="login-page">Verificando sesión…</main>
  return isAllowed ? children : <Navigate to="/admin/login" replace />
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BootPage />} />
      <Route path="/terminal" element={<TerminalPage />} />
      <Route path="/libro" element={<BookPage />} />
      <Route path="/arbol" element={<TreePage />} />
      <Route path="/mensajes" element={<MessagesPage />} />
      <Route path="/colaborar" element={<CollaboratePage />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/recuerdos" element={<ProtectedRoute><AdminMemoriesPage /></ProtectedRoute>} />
      <Route path="/admin/ensenanzas" element={<ProtectedRoute><AdminTeachingsPage /></ProtectedRoute>} />
      <Route path="/admin/mensajes" element={<ProtectedRoute><AdminMessagesPage /></ProtectedRoute>} />
      <Route path="/admin/media" element={<ProtectedRoute><AdminMediaPage /></ProtectedRoute>} />
      <Route path="/admin/usuarios" element={<ProtectedRoute><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/configuracion" element={<ProtectedRoute><AdminSettingsPage /></ProtectedRoute>} />
      <Route path="/admin/comandos" element={<ProtectedRoute><AdminCommandsPage /></ProtectedRoute>} />
      <Route path="/admin/auditoria" element={<ProtectedRoute><AdminAuditPage /></ProtectedRoute>} />
      <Route path="/error" element={<UnauthorizedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
