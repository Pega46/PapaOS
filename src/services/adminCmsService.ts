import type { ContentStatus } from '../models/ContentStatus'
import type { Memory } from '../models/Memory'
import type { Teaching } from '../models/Teaching'
import type { TerminalActionType, TerminalCommand } from '../models/TerminalCommand'
import type { Profile, UserRole } from '../models/Profile'
import { validateMediaFile } from './mediaService'
import { hasSupabaseConfig, supabase } from './supabaseClient'

function client() {
  if (!hasSupabaseConfig || !supabase) throw new Error('Supabase no está configurado.')
  return supabase
}

async function currentUserId() {
  const { data: { user }, error } = await client().auth.getUser()
  if (error) throw error
  if (!user) throw new Error('La sesión administrativa expiró.')
  return user.id
}

type CmsRow = Record<string, unknown>
type MemoryRow = CmsRow & { media_files?: { public_url?: string; media_type?: 'image' | 'video' } | null }

const memoryFromRow = (row: MemoryRow): Memory => ({
  id: String(row.id), title: String(row.title), body: String(row.body),
  dateLabel: row.date_label ? String(row.date_label) : undefined, category: row.category ? String(row.category) : undefined,
  authorName: row.author_name ? String(row.author_name) : undefined, authorRelation: row.author_relation ? String(row.author_relation) : undefined,
  mediaUrl: row.media_files?.public_url ?? undefined, mediaType: row.media_files?.media_type ?? undefined,
  status: row.status as ContentStatus, orderIndex: Number(row.order_index ?? 0), featured: Boolean(row.featured),
})

export async function listAdminMemories(): Promise<Memory[]> {
  const { data, error } = await client().from('memories').select('*, media_files(public_url, media_type)').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(memoryFromRow)
}

export async function createMemory(input: { title: string; body: string; dateLabel?: string; category?: string; authorName?: string; authorRelation?: string; file?: File | null }) {
  const db = client()
  const createdBy = await currentUserId()
  let mediaId: string | undefined
  if (input.file) {
    const validation = validateMediaFile(input.file)
    if (validation) throw new Error(validation)
    const extension = input.file.name.split('.').pop()?.toLowerCase() ?? 'file'
    const path = `${createdBy}/${crypto.randomUUID()}.${extension}`
    const { error: uploadError } = await db.storage.from('memory-media').upload(path, input.file, { contentType: input.file.type, upsert: false })
    if (uploadError) throw uploadError
    const { data: publicData } = db.storage.from('memory-media').getPublicUrl(path)
    const { data: media, error: mediaError } = await db.from('media_files').insert({
      bucket: 'memory-media', path, public_url: publicData.publicUrl, file_name: input.file.name,
      mime_type: input.file.type, file_size: input.file.size,
      media_type: input.file.type.startsWith('video/') ? 'video' : 'image', status: 'approved', uploaded_by: createdBy,
    }).select('id').single()
    if (mediaError) throw mediaError
    mediaId = media.id
  }
  const { error } = await db.from('memories').insert({
    title: input.title.trim(), body: input.body.trim(), date_label: input.dateLabel || null, category: input.category || null,
    author_name: input.authorName || null, author_relation: input.authorRelation || null, media_id: mediaId ?? null,
    status: 'approved', created_by: createdBy,
  })
  if (error) throw error
}

export async function setMemoryStatus(id: string, status: ContentStatus) {
  const { error } = await client().from('memories').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteMemory(id: string) {
  const { error } = await client().from('memories').delete().eq('id', id)
  if (error) throw error
}

const teachingFromRow = (row: CmsRow): Teaching => ({ id: String(row.id), branch: String(row.branch), title: String(row.title), body: String(row.body), authorName: row.author_name ? String(row.author_name) : undefined, authorRelation: row.author_relation ? String(row.author_relation) : undefined, status: row.status as ContentStatus, orderIndex: Number(row.order_index ?? 0) })

export async function listAdminTeachings(): Promise<Teaching[]> {
  const { data, error } = await client().from('teachings').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(teachingFromRow)
}

export async function createTeaching(input: Omit<Teaching, 'id' | 'status' | 'orderIndex'>) {
  const { error } = await client().from('teachings').insert({ branch: input.branch, title: input.title, body: input.body, author_name: input.authorName || null, author_relation: input.authorRelation || null, status: 'approved', created_by: await currentUserId() })
  if (error) throw error
}

export async function setTeachingStatus(id: string, status: ContentStatus) {
  const { error } = await client().from('teachings').update({ status }).eq('id', id)
  if (error) throw error
}

export async function deleteTeaching(id: string) {
  const { error } = await client().from('teachings').delete().eq('id', id)
  if (error) throw error
}

const commandFromRow = (row: CmsRow): TerminalCommand => ({ command: String(row.command), description: String(row.description), response: row.response ? String(row.response) : undefined, actionType: row.action_type as TerminalActionType, actionTarget: row.action_target ? String(row.action_target) : undefined, enabled: Boolean(row.enabled), orderIndex: Number(row.order_index ?? 0) })
export async function listAdminCommands(): Promise<TerminalCommand[]> {
  const { data, error } = await client().from('terminal_commands').select('*').order('order_index')
  if (error) throw error
  return (data ?? []).map(commandFromRow)
}
export async function saveCommand(input: { command: string; description: string; response?: string; enabled: boolean }) {
  const normalized = input.command.trim().replace(/\s+/g, ' ').toUpperCase()
  if (!/^[A-Z0-9 ._-]{2,50}$/.test(normalized)) throw new Error('El comando debe tener entre 2 y 50 caracteres seguros.')
  const { error } = await client().from('terminal_commands').upsert({ command: normalized, description: input.description.trim(), response: input.response?.trim() || null, action_type: 'message' as TerminalActionType, action_target: null, enabled: input.enabled }, { onConflict: 'command' })
  if (error) throw error
}
export async function toggleCommand(command: string, enabled: boolean) {
  const { error } = await client().from('terminal_commands').update({ enabled }).eq('command', command)
  if (error) throw error
}

export async function listProfiles(): Promise<Profile[]> {
  const { data, error } = await client().from('profiles').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map((row) => ({ id: row.id, fullName: row.full_name, email: row.email ?? undefined, role: row.role, avatarUrl: row.avatar_url ?? undefined, isActive: row.is_active }))
}
export async function updateProfile(id: string, changes: { role: UserRole; isActive: boolean }) {
  const { error } = await client().from('profiles').update({ role: changes.role, is_active: changes.isActive }).eq('id', id)
  if (error) throw error
}
