import type { AuditParams } from '@shared/api/audit/types'
import { EMPLOYEES_PATH } from '@shared/api/employees/employees.service'

export const queryKeys = {
  employees: {
    getList: () => [EMPLOYEES_PATH, 'list'],
    getDetails: (id: string) => [EMPLOYEES_PATH, id],
    getDepartments: () => [EMPLOYEES_PATH, 'departments'],
    getPositions: (department: string) => [EMPLOYEES_PATH, department, 'positions'],
  },
  audit: {
    getAll: () => ['audit'],
    getList: (params: AuditParams) => [...queryKeys.audit.getAll(), 'list', params],
  },
}
