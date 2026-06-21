import type { ContentStatus } from './ContentStatus'

export interface FamilyMessage {
  id: string
  authorName: string
  authorRelation: string
  body: string
  status: ContentStatus
  featured: boolean
}
