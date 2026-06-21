import { listApprovedMemories, listPendingMemories } from '../services/memoriesService'

export const memoryController = {
  listApproved: listApprovedMemories,
  listPending: listPendingMemories,
}
