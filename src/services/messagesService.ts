import { sampleMessages } from '../data/mockData'
import type { FamilyMessage } from '../models/Message'
import { hasSupabaseConfig, supabase } from './supabaseClient'

const mapMessage = (row: Record<string, unknown>): FamilyMessage => ({
  id: String(row.id),
  authorName: String(row.author_name),
  authorRelation: String(row.author_relation),
  body: String(row.body),
  status: 'approved',
  featured: Boolean(row.featured),
})

export async function listApprovedMessages(): Promise<FamilyMessage[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleMessages.filter((message) => message.status === 'approved')
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('status', 'approved')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapMessage(row))
}

export async function listPendingMessages(): Promise<FamilyMessage[]> {
  if (!hasSupabaseConfig || !supabase) {
    return sampleMessages.filter((message) => message.status === 'pending')
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapMessage(row))
}

export interface ContributionPayload {
  name: string
  relation: string
  contributionType: string
  title: string
  message: string
  category: string
}

export async function submitContribution(payload: ContributionPayload): Promise<void> {
  if (!hasSupabaseConfig || !supabase) return

  if (payload.contributionType === 'Mensaje familiar') {
    const { error } = await supabase.from('messages').insert({
      author_name: payload.name,
      author_relation: payload.relation,
      body: payload.message,
      status: 'pending',
    })
    if (error) throw error
    return
  }

  if (payload.contributionType === 'Enseñanza para el árbol') {
    const { error } = await supabase.from('teachings').insert({
      branch: payload.category || 'Vida',
      title: payload.title,
      body: payload.message,
      author_name: payload.name,
      author_relation: payload.relation,
      status: 'pending',
    })
    if (error) throw error
    return
  }

  const { error } = await supabase.from('memories').insert({
    title: payload.title,
    body: payload.message,
    category: payload.category,
    author_name: payload.name,
    author_relation: payload.relation,
    status: 'pending',
  })
  if (error) throw error
}
