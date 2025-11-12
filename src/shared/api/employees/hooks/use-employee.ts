import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@shared/api/queryKeys'
import { employeesService } from '@shared/api//employees/employees.service'

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: queryKeys.employees.details(id),
    queryFn: () => employeesService.getEmployee(id),
  })
}
