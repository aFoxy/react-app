import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { clientLoader } from './DashboardPage'

export const dashboardRoute: RouteObject = {
  path: Routes.DASHBOARD,
  handle: {
    title: 'Dashboard',
    requireAuth: true,
  },
  loader: clientLoader,
  lazy: async () => {
    const module = await import('./DashboardPage')

    return { Component: module.default }
  },
}
