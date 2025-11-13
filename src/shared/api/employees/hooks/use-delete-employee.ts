import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'
import type { Employee } from '@shared/api/employees/types'

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: employeesService.deleteEmployee,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.employees.list() })
      const previousList = queryClient.getQueryData<Employee[]>(queryKeys.employees.list())
      queryClient.setQueryData(
        queryKeys.employees.list(),
        (old: Employee[] | undefined) => old?.filter((item) => item.id !== id) ?? []
      )

      return { previousList }
    },
    onSuccess: (data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.employees.details(id) })
    },
    onError: (error, id, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(queryKeys.employees.list(), context.previousList)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.employees.list() })
    },
  })
}
