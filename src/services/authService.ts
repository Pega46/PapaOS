import { supabase } from './supabaseClient'
import type { UserRole } from '../models/Profile'

export interface AdminSession {
  id: string
  name: string
  email: string
  role: UserRole
}

const adminRoles: UserRole[] = ['super_admin', 'admin']

function getClient() {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Complete VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }

  return supabase
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const client = getClient()
  const { data: { session }, error: sessionError } = await client.auth.getSession()

  if (sessionError) throw sessionError
  if (!session?.user.email) return null

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('full_name, role, is_active')
    .eq('id', session.user.id)
    .maybeSingle()

  if (profileError) throw profileError
  if (!profile || !profile.is_active || !adminRoles.includes(profile.role as UserRole)) return null

  return {
    id: session.user.id,
    name: profile.full_name,
    email: session.user.email,
    role: profile.role as UserRole,
  }
}

export async function loginAdmin(email: string, password: string): Promise<AdminSession> {
  if (!email.trim() || !password.trim()) {
    throw new Error('Ingrese correo y clave administrativa.')
  }

  const client = getClient()
  const { error } = await client.auth.signInWithPassword({ email: email.trim(), password })
  if (error) throw error

  const session = await getAdminSession()
  if (!session) {
    await client.auth.signOut()
    throw new Error('Esta cuenta no tiene permisos administrativos activos.')
  }

  return session
}

export async function logoutAdmin(): Promise<void> {
  const { error } = await getClient().auth.signOut()
  if (error) throw error
}
