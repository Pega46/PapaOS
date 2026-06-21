import type { ContentStatus } from './ContentStatus'

export interface Memory {
  id: string
  title: string
  body: string
  dateLabel?: string
  category?: string
  authorName?: string
  authorRelation?: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
  status: ContentStatus
  orderIndex: number
  featured: boolean
}
