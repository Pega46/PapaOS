import { terminalCommands } from '../data/mockData'
import type { TerminalCommand } from '../models/TerminalCommand'
import { hasSupabaseConfig, supabase } from './supabaseClient'

export async function listTerminalCommands(): Promise<TerminalCommand[]> {
  if (!hasSupabaseConfig || !supabase) {
    return terminalCommands
  }

  const { data, error } = await supabase
    .from('terminal_commands')
    .select('*')
    .eq('enabled', true)
    .order('order_index', { ascending: true })

  if (error) throw error

  return (data ?? []).map((row) => ({
    command: row.command,
    description: row.description,
    response: row.response ?? undefined,
    actionType: row.action_type,
    actionTarget: row.action_target ?? undefined,
    enabled: row.enabled,
    orderIndex: row.order_index,
  }))
}
