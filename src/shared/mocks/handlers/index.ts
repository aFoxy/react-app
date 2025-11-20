import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'

import { networkDelay } from '../utils'

import { authHandlers } from './auth'
import { employeesHandlers } from './employees'
import { auditHandlers } from '@shared/mocks/handlers/audit'

export const handlers = [
  ...authHandlers,
  ...employeesHandlers,
  ...auditHandlers,
  http.get(`${API_URL}/healthcheck`, async () => {
    await networkDelay()

    return HttpResponse.json({ ok: true })
  }),
]
