export function logAudit(action: string, entityType: string, metadata?: Record<string, unknown>): void {
  console.info('[PapaOS audit]', { action, entityType, metadata, createdAt: new Date().toISOString() })
}
