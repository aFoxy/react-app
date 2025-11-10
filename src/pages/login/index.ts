import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'

export const loginRoute: RouteObject = {
  path: Routes.LOGIN,
  handle: {
    title: 'Login',
  },
  lazy: async () => {
    const module = await import('./LoginPage.tsx')

    return { Component: module.default }
  },
}
