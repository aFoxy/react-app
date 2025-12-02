import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'
import type { Employee } from '@/schemas/employee-schema'

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: employeesService.deleteEmployee,
    onMutate: async (id: string) => {
      const previousList = queryClient.getQueryData<Employee[]>(queryKeys.employees.getList())
      queryClient.setQueryData(
        queryKeys.employees.getList(),
        (old: Employee[] | undefined) => old?.filter((item) => item.id !== id) ?? []
      )

      return { previousList }
    },
    onSuccess: (data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.employees.getDetails(id) })
    },
    onError: (error, id, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.employees.getList(), context.previousList)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.getList() })
    },
  })
}
