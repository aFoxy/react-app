import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { clientLoader } from './RefsPage'

export const refsRoute: RouteObject = {
  path: Routes.REFS,
  handle: {
    title: 'Refs',
    requireAuth: true,
  },
  loader: clientLoader,
  lazy: async () => {
    const module = await import('./RefsPage')

    return { Component: module.default }
  },
}
