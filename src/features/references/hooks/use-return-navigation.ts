import { useLocation, useNavigate } from 'react-router'
import { Routes } from '@/app/routes'

export const useReturnNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return () => {
    const fromList = location.state?.fromList
    const searchParams = location.state?.searchParams || ''

    if (fromList) {
      navigate(`${Routes.REFS}${searchParams}`, { replace: true })
    } else {
      navigate(Routes.REFS, { replace: true })
    }
  }
}
