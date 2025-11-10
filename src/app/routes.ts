export const Routes = {
  ANY: '*',
  NOT_FOUND: '/404',
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  AUDIT: '/audit',
  REFS: '/refs',
  USER: '/users/:id',
} as const

export type Routes = (typeof Routes)[keyof typeof Routes]
