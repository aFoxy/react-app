import { useQuery } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'

export const usePositionsByDepartment = (department?: string) => {
  return useQuery({
    queryKey: queryKeys.employees.getPositions(department ?? ''),
    queryFn: () => employeesService.getPositionsByDepartment(department ?? ''),
    staleTime: Infinity,
    enabled: !!department,
  })
}
