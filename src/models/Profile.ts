export type UserRole = 'super_admin' | 'admin' | 'collaborator' | 'visitor'

export interface Profile {
  id: string
  fullName: string
  email?: string
  role: UserRole
  avatarUrl?: string
  isActive: boolean
}
