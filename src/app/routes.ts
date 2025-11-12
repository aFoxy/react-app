export const Routes = {
  ANY: '*',
  NOT_FOUND: '/404',
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  AUDIT: '/audit',
  REFS: '/refs',
  REF: '/refs/:id',
  REF_EDIT: '/refs/:id/edit',
  REF_CREATE: '/refs/create',
  USER: '/users/:id',
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]
