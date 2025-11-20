export interface AuditRecord {
  id: string
  timestamp: string
  action: string
  userId?: string
  status: AuditStatus
}

export type AuditStatus = 'success' | 'error' | 'pending'

export interface AuditParams {
  sortBy?: string
  status?: AuditStatus
  action?: string
  page?: number | string
  size?: number | string
}
