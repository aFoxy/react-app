import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'
import { db } from '../db'
import { networkDelay, requireAuth } from '../utils'
/* eslint-disable @typescript-eslint/no-explicit-any */
type SortField = 'timestamp' | 'action' | 'status'
type SortDirection = 'asc' | 'desc'
type Sort = {
  id: SortField
  direction: SortDirection
}

const isSortField = (value: unknown): value is SortField => {
  return ['timestamp', 'action', 'status'].includes(String(value))
}

const isSortDirection = (value: unknown): value is SortDirection => {
  return ['asc', 'desc'].includes(String(value))
}

export const auditHandlers = [
  http.get(`${API_URL}/audit`, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const url = new URL(request.url)
      const page = Number(url.searchParams.get('page')) || 0
      const size = Number(url.searchParams.get('size')) || 20

      const sortParam = url.searchParams.get('sortBy')
      const sorting: Sort | undefined = sortParam
        ? (() => {
            const [id, dir] = sortParam.split('.')

            if (!isSortField(id) || !isSortDirection(dir)) {
              return undefined
            }

            return { id, direction: dir }
          })()
        : undefined

      const action = url.searchParams.get('action')
      const status = url.searchParams.get('status')

      const where: Record<string, { equals: string }> = {}

      if (status) {
        where.status = { equals: status }
      }

      if (action) {
        where.action = { equals: action }
      }

      const totalElements = db.audit.count({ where })

      const records = db.audit.findMany({
        where,
        orderBy: sorting ? ({ [sorting.id as SortField]: sorting.direction } as any) : undefined,
        take: size,
        skip: page * size,
      })
      const totalPages = Math.floor(totalElements / size)

      return HttpResponse.json({
        content: records,
        totalElements,
        pageIndex: Math.min(totalPages, page),
        pageSize: size,
        totalPages,
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.post(`${API_URL}/audit/export`, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)

      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }

      const body = (await request.json()) as string[]
      const ids: string[] = body ?? []

      const records = db.audit.findMany({
        where: {
          id: { in: ids },
        },
      })

      return HttpResponse.json(records)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),
]
