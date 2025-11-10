import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { AuditErrorBoundary } from './AuditErrorBoundary'
import { clientLoader } from '@pages/audit/AuditPage'

export const auditRoute: RouteObject = {
  path: Routes.AUDIT,
  handle: {
    title: 'Audit',
    requireAuth: true,
  },
  loader: clientLoader,
  ErrorBoundary: AuditErrorBoundary,
  lazy: async () => {
    const module = await import('./AuditPage')

    return { Component: module.default }
  },
}
