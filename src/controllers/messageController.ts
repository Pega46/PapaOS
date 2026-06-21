import { listApprovedMessages, listPendingMessages, submitContribution } from '../services/messagesService'

export const messageController = {
  listApproved: listApprovedMessages,
  listPending: listPendingMessages,
  submitContribution,
}
