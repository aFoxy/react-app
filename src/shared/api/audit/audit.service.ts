import { api } from '@shared/api/api-client'
import type { AuditParams, AuditRecord } from '@shared/api/audit/types'
import type { Pageable } from '@shared/types'

export const auditService = {
  getAuditRecords: (params: AuditParams): Promise<Pageable<AuditRecord>> => {
    return api.get(`audit`, { params })
  },

  getAuditRecordsForExport: (ids: string[]): Promise<AuditRecord[]> => {
    return api.post(`audit/export`, ids)
  },
}
