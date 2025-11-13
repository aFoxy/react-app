import { api } from '@shared/api/api-client'
import type { Employee } from '@shared/api/employees/types'

export const employeesService = {
  getEmployees: async (): Promise<Employee[]> => {
    const response = await api.get(`employees`)

    return response.data
  },

  getEmployee: async (id: string): Promise<Employee> => {
    const response = await api.get(`employees/${id}`)

    return response.data
  },

  createEmployee: async (data: Omit<Employee, 'id'>): Promise<Employee> => {
    return await api.post(`employees`, data)
  },

  updateEmployee: async (id: string | number, data: Partial<Employee>): Promise<Employee> => {
    return await api.patch(`employees/${id}`, data)
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await api.delete(`employees/${id}`)
  },

  getDepartments: async (): Promise<string[]> => {
    return api.get(`employees/departments`)
  },
}
