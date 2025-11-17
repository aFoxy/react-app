import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'

import { networkDelay } from '../utils'

import { authHandlers } from './auth'
import { employeesHandlers } from './employees'

export const handlers = [
  ...authHandlers,
  ...employeesHandlers,
  http.get(`${API_URL}/healthcheck`, async () => {
    await networkDelay()

    return HttpResponse.json({ ok: true })
  }),
]
