import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'

export const refsRoute: RouteObject = {
  path: Routes.REFS,
  handle: {
    title: 'Refs',
    requireAuth: true,
  },
  children: [
    {
      path: '',
      lazy: async () => {
        const module = await import('./RefsPage')

        return { Component: module.default }
      },
    },
    {
      path: Routes.REF,
      lazy: async () => {
        const module = await import('./EmployeeDetailsPage')

        return { Component: module.default }
      },
    },
    {
      path: Routes.REF_EDIT,
      lazy: async () => {
        const module = await import('./EmployeeEditPage')

        return { Component: module.default }
      },
    },
    {
      path: Routes.REF_CREATE,
      lazy: async () => {
        const module = await import('./EmployeeCreatePage')

        return { Component: module.default }
      },
    },
  ],
}
