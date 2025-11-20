import type { AuditParams } from '@shared/api/audit/types'

export const queryKeys = {
  employees: {
    all: ['employees'] as const,
    list: () => [...queryKeys.employees.all, 'list'],
    details: (id: string) => [...queryKeys.employees.all, id] as const,
    departments: () => [...queryKeys.employees.all, 'departments'],
  },
  audit: {
    all: ['audit'] as const,
    list: (params: AuditParams) => [...queryKeys.audit.all, 'list', params],
  },
}
