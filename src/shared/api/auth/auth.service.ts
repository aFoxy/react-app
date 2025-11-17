import { api } from '@shared/api/api-client'
import type { User } from '@shared/api/auth/types'

export const authService = {
  login: (user: User): Promise<{ user: User; jwt: string }> => api.post('/auth/login', user),
}
