import { sampleMemories } from '../data/mockData'
import type { Memory } from '../models/Memory'
import { hasSupabaseConfig, supabase } from './supabaseClient'

const mapMemory = (row: Record<string, unknown>): Memory => ({
  id: String(row.id),
  title: String(row.title),
  body: String(row.body),
  dateLabel: row.date_label ? String(row.date_label) : undefined,
  category: row.category ? String(row.category) : undefined,
  authorName: row.author_name ? String(row.author_name) : undefined,
  authorRelation: row.author_relation ? String(row.author_relation) : undefined,
  mediaUrl: row.media_files && typeof row.media_files === 'object' ? String((row.media_files as { public_url?: string }).public_url ?? '') : undefined,
  mediaType: row.media_files && typeof row.media_files === 'object' ? ((row.media_files as { media_type?: 'image' | 'video' }).media_type) : undefined,
  status: 'approved',
  orderIndex: Number(row.order_index ?? 0),
  featured: Boolean(row.featured),
})

export async function listApprovedMemories(): Promise<Memory[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleMemories.filter((memory) => memory.status === 'approved')
  }

  const { data, error } = await supabase
    .from('memories')
    .select('*, media_files(public_url, media_type)')
    .eq('status', 'approved')
    .order('order_index', { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => mapMemory(row))
}

export async function listPendingMemories(): Promise<Memory[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleMemories.filter((memory) => memory.status === 'pending')
  }

  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapMemory(row))
}
