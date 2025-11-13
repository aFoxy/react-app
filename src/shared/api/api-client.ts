import Axios from 'axios'

import { Routes } from '@/app/routes'
import { API_URL } from '@shared/mocks/env'
import { toast } from 'sonner'

export const api = Axios.create({
  baseURL: API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    toast.error(message)

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('from') || location.pathname
      location.href = `${Routes.LOGIN}?from=${encodeURIComponent(redirectTo)}`
    }

    return Promise.reject(error)
  }
)
