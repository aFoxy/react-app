import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@shared/api/queryKeys'
import { auditService } from '@shared/api/audit/audit.service'
import type { AuditParams } from '@shared/api/audit/types'

export const useAuditRecords = (params: AuditParams) => {
  return useQuery({
    queryKey: queryKeys.audit.list(params),
    queryFn: () => auditService.getAuditRecords(params),
    placeholderData: keepPreviousData,
  })
}
