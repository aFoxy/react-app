import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'

export const notFoundRoute: RouteObject = {
  path: Routes.NOT_FOUND,
  handle: {
    title: 'Not found',
  },
  lazy: async () => {
    const module = await import('./NotFound.tsx')

    return { Component: module.default }
  },
}
