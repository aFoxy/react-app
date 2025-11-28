import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'
import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'
import { type Department, DEPARTMENTS, POSITIONS_BY_DEPARTMENT } from '@shared/mocks/employees'
import type { CreateEmployeeFields, Employee } from '@/schemas/employee-schema'
import { CreateEmployeeSchema } from '@/schemas/employee-schema'

function checkUniqueEmail(email: string): string | null {
  const exists = db.employees.findFirst({
    where: { email: { equals: email } },
  })

  return exists ? 'Employee with this email already exists' : null
}

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

  http.get(`${API_URL}/employees/departments/:department/positions`, async ({ params }) => {
    await networkDelay()

    try {
      const department = params.department as Department

      return HttpResponse.json(POSITIONS_BY_DEPARTMENT[department])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.get(`${API_URL}/employees`, async ({ cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

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

      const data = (await request.json()) as CreateEmployeeFields

      // / Валидация через Zod
      const parseResult = CreateEmployeeSchema.safeParse(data)

      if (!parseResult.success) {
        const fieldErrors: Record<string, string> = {}
        parseResult.error.issues.forEach((error) => {
          const path = error.path.join('.')
          fieldErrors[path] = error.message
        })

        if (data.email && !fieldErrors.email) {
          const emailError = checkUniqueEmail(data.email)

          if (emailError) fieldErrors.email = emailError
        }

        return HttpResponse.json({ fieldErrors }, { status: 400 })
      }

      // 🔍 Проверка уникальности email
      if (parseResult.data.email) {
        const exists = db.employees.findFirst({
          where: { email: { equals: parseResult.data.email } },
        })

        if (exists) {
          return HttpResponse.json(
            { email: 'Employee with this email already exists' },
            { status: 400 }
          )
        }
      }

      const result = db.employees.create({
        ...data,
        salary: data.salary ?? undefined,
        id: crypto.randomUUID(),
      })
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
        data: {
          ...data,
          salary: data.salary ?? undefined,
        },
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
