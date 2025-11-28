import { api } from '@shared/api/api-client'
import type { CreateEmployeeFields, Employee } from '@/schemas/employee-schema'

export const EMPLOYEES_PATH = 'employees'

export const employeesService = {
  getEmployees: async (): Promise<Employee[]> => {
    const response = await api.get(EMPLOYEES_PATH)

    return response.data
  },

  getEmployee: async (id: string): Promise<Employee> => {
    const response = await api.get(`${EMPLOYEES_PATH}/${id}`)

    return response.data
  },

  createEmployee: (data: CreateEmployeeFields): Promise<Employee> => {
    return api.post(EMPLOYEES_PATH, data)
  },

  updateEmployee: (id: string | number, data: Partial<Employee>): Promise<Employee> => {
    return api.patch(`${EMPLOYEES_PATH}/${id}`, data)
  },

  deleteEmployee: (id: string): Promise<void> => {
    return api.delete(`${EMPLOYEES_PATH}/${id}`)
  },

  getDepartments: (): Promise<string[]> => {
    return api.get(`${EMPLOYEES_PATH}/departments`)
  },

  getPositionsByDepartment: (department: string): Promise<string[]> => {
    return api.get(`${EMPLOYEES_PATH}/departments/${department}/positions`)
  },
}
