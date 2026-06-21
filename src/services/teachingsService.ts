import { sampleTeachings } from '../data/mockData'
import type { Teaching } from '../models/Teaching'
import { hasSupabaseConfig, supabase } from './supabaseClient'

const mapTeaching = (row: Record<string, unknown>): Teaching => ({
  id: String(row.id),
  branch: String(row.branch),
  title: String(row.title),
  body: String(row.body),
  authorName: row.author_name ? String(row.author_name) : undefined,
  authorRelation: row.author_relation ? String(row.author_relation) : undefined,
  status: 'approved',
  orderIndex: Number(row.order_index ?? 0),
})

export async function listApprovedTeachings(): Promise<Teaching[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleTeachings.filter((teaching) => teaching.status === 'approved')
  }

  const { data, error } = await supabase
    .from('teachings')
    .select('*')
    .eq('status', 'approved')
    .order('order_index', { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => mapTeaching(row))
}

export async function listPendingTeachings(): Promise<Teaching[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleTeachings.filter((teaching) => teaching.status === 'pending')
  }

  const { data, error } = await supabase
    .from('teachings')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapTeaching(row))
}
