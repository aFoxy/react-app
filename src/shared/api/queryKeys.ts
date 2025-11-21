import type { AuditParams } from '@shared/api/audit/types'

export const queryKeys = {
  employees: {
    getAll: () => ['employees'],
    getList: () => [...queryKeys.employees.getAll(), 'list'],
    getDetails: (id: string) => [...queryKeys.employees.getAll(), id],
    getDepartments: () => [...queryKeys.employees.getAll(), 'departments'],
  },
  audit: {
    getAll: () => ['audit'],
    getList: (params: AuditParams) => [...queryKeys.audit.getAll(), 'list', params],
  },
}
