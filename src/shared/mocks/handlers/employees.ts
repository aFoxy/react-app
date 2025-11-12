import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'
import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'
import { DEPARTMENTS } from '@shared/mocks/employees'
import type { Employee } from '@shared/api//employees/types'

export const employeesHandlers = [
  http.get(`${API_URL}/employees/departments`, async () => {
    await networkDelay()

    try {
      return HttpResponse.json(DEPARTMENTS)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.get(`${API_URL}/employees`, async () => {
    await networkDelay()

    try {
      const result = db.employees.getAll()

      return HttpResponse.json({ data: result })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.get(`${API_URL}/employees/:employeeId`, async ({ params, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const employeeId = params.employeeId as string
      const employee = db.employees.findFirst({
        where: {
          id: {
            equals: employeeId,
          },
        },
      })

      if (!employee) {
        return HttpResponse.json({ message: 'Employee not found' }, { status: 404 })
      }

      return HttpResponse.json({ data: employee })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.post(`${API_URL}/employees`, async ({ request, cookies }) => {
    await networkDelay()
    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const data = (await request.json()) as Omit<Employee, 'id'>
      const result = db.employees.create({ ...data, id: crypto.randomUUID() })
      await persistDb('employees')

      return HttpResponse.json(result)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.patch(`${API_URL}/employees/:employeeId`, async ({ request, params, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const data = (await request.json()) as Employee
      const employeeId = params.employeeId as string
      // requireAdmin(user);
      const result = db.employees.update({
        where: {
          id: {
            equals: employeeId,
          },
        },
        data,
      })
      await persistDb('employees')

      return HttpResponse.json(result)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.delete(`${API_URL}/employees/:employeeId`, async ({ cookies, params }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const employeeId = params.employeeId as string
      const result = db.employees.delete({
        where: {
          id: {
            equals: employeeId,
          },
        },
      })
      await persistDb('employees')

      return HttpResponse.json(result)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),
]
