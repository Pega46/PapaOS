import type { ContentStatus } from './ContentStatus'

export interface MediaFile {
  id: string
  bucket: string
  path: string
  publicUrl?: string
  fileName: string
  mimeType: string
  fileSize: number
  mediaType: 'image' | 'video'
  status: ContentStatus
}
