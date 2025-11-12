import { HttpResponse, http } from 'msw'

import { API_URL } from '../env'
import { db } from '../db'
import { authenticate, hash, requireAuth, AUTH_COOKIE, networkDelay } from '../utils'
import type { User } from '@shared/api//auth/types'

type LoginBody = {
  email: string
  password: string
}

export const authHandlers = [
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    await networkDelay()

    try {
      const resp = (await request.json()) as User
      db.user.create({
        ...resp,
        username: resp.email.split('@')[0],
        password: hash(resp.password!),
      })
      const credentials = resp as LoginBody
      const result = authenticate(credentials as LoginBody)

      return HttpResponse.json(result, {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=${result.jwt}; Path=/;`,
        },
      })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),

  http.post(`${API_URL}/auth/logout`, async () => {
    await networkDelay()

    return HttpResponse.json(
      { message: 'Logged out' },
      {
        headers: {
          'Set-Cookie': `${AUTH_COOKIE}=; Path=/;`,
        },
      }
    )
  }),

  http.get(`${API_URL}/auth/me`, async ({ cookies }) => {
    await networkDelay()

    try {
      const { user } = requireAuth(cookies)

      return HttpResponse.json({ data: user })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Server Error'

      return HttpResponse.json({ message: message || 'Server Error' }, { status: 500 })
    }
  }),
]
