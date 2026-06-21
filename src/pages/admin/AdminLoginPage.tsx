import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authController } from '../../controllers/authController'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    const form = new FormData(event.currentTarget)
    setIsSubmitting(true)
    try {
      await authController.login(String(form.get('email') ?? ''), String(form.get('password') ?? ''))
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Acceso denegado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-panel" onSubmit={handleSubmit}>
        <p className="terminal-label">ADMIN LOGIN</p>
        <h1>PapaOS</h1>
        <p>Este modulo requiere permisos administrativos.</p>
        <label>
          Correo
          <input name="email" type="email" required />
        </label>
        <label>
          Clave
          <input name="password" type="password" required />
        </label>
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </main>
  )
}
