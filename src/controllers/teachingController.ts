import { listApprovedTeachings, listPendingTeachings } from '../services/teachingsService'

export const teachingController = {
  listApproved: listApprovedTeachings,
  listPending: listPendingTeachings,
}
