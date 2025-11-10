import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { clientLoader } from '@pages/users/UserPage'

export const userRoute: RouteObject = {
  path: Routes.USER,
  handle: {
    title: 'User',
    requireAuth: true,
  },
  loader: clientLoader,
  lazy: async () => {
    const module = await import('./UserPage')

    return { Component: module.default }
  },
}
