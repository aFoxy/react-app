import { useQuery } from '@tanstack/react-query'
import { employeesService } from '@shared/api//employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'

export const useEmployeesDepartments = () => {
  return useQuery({
    queryKey: queryKeys.employees.departments(),
    queryFn: () => employeesService.getDepartments(),
    staleTime: Infinity,
  })
}
