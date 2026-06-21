import type { ContentStatus } from './ContentStatus'

export interface Teaching {
  id: string
  branch: string
  title: string
  body: string
  authorName?: string
  authorRelation?: string
  status: ContentStatus
  orderIndex: number
}
