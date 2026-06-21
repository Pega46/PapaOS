export type TerminalActionType = 'navigate' | 'message' | 'clear' | 'system' | 'list'

export interface TerminalCommand {
  command: string
  description: string
  response?: string
  actionType: TerminalActionType
  actionTarget?: string
  enabled: boolean
  orderIndex: number
}

export interface TerminalResult {
  command: string
  lines: string[]
  clear?: boolean
  navigateTo?: string
  exit?: boolean
}
