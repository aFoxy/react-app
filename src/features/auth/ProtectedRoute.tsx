import { useAuth } from '@features/auth/auth-context'
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />
  )
}
