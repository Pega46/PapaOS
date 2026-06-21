import { memoryController } from './memoryController'
import { messageController } from './messageController'
import { teachingController } from './teachingController'

export async function getAdminDashboardStats() {
  const [memories, teachings, messages] = await Promise.all([
    memoryController.listPending(),
    teachingController.listPending(),
    messageController.listPending(),
  ])

  return {
    pendingMemories: memories.length,
    pendingTeachings: teachings.length,
    pendingMessages: messages.length,
    uploadedFiles: 0,
    publicationStatus: 'Publico: solo contenido approved',
  }
}
