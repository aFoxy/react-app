import { useQuery } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'

export const useEmployees = () => {
  return useQuery({
    queryKey: queryKeys.employees.getList(),
    queryFn: () => employeesService.getEmployees(),
  })
}
