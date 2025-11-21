import type { RouteObject } from 'react-router'
import { Routes } from '@/app/routes'
import { AuditErrorBoundary } from './AuditErrorBoundary'

export const auditRoute: RouteObject = {
  path: Routes.AUDIT,
  handle: {
    title: 'Audit',
    requireAuth: true,
  },

  ErrorBoundary: AuditErrorBoundary,
  lazy: async () => {
    const module = await import('./AuditPage')

    return { Component: module.default }
  },
}
