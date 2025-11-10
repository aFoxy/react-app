import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { ErrorBoundary } from './ErrorBoundary'
import { clientLoader } from '@pages/audit/AuditPage'

export const auditRoute: RouteObject = {
  path: Routes.AUDIT,
  handle: {
    title: 'Audit',
    requireAuth: true,
  },
  loader: clientLoader,
  ErrorBoundary: ErrorBoundary,
  lazy: async () => {
    const module = await import('./AuditPage')

    return { Component: module.default }
  },
}
