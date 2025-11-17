import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import type { Employee } from '@shared/api/employees/types'
import { queryKeys } from '@shared/api/queryKeys'

interface UseCreateEmployeeOptions {
  onSuccess?: (data: Employee) => void
  onError?: (error: Error) => void
}

export const useCreateEmployee = (options?: UseCreateEmployeeOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Employee, 'id'>) => employeesService.createEmployee(data),

    onMutate: async (newEmployee) => {
      // Отменить активные запросы
      await queryClient.cancelQueries({
        queryKey: queryKeys.employees.list(),
      })

      // Получить старые данные для отката
      const previousList = queryClient.getQueryData<Employee[]>(queryKeys.employees.list())

      const tempEmployee: Employee = {
        ...newEmployee,
        id: `temp-${Date.now()}`,
      }

      // Обновить кэш сразу (optimistic)
      if (previousList) {
        queryClient.setQueryData(queryKeys.employees.list(), {
          ...previousList,
          ...tempEmployee,
        })
      }

      return { previousList }
    },

    onSuccess: (newEmployee) => {
      // Подтвердить обновление окончательными данными
      queryClient.setQueryData(queryKeys.employees.details(newEmployee.id), newEmployee)

      queryClient.invalidateQueries({
        queryKey: queryKeys.employees.list(),
        type: 'active',
      })

      options?.onSuccess?.(newEmployee)
    },

    onError: (error: Error, _, context) => {
      // Откатить при ошибке
      if (context?.previousList) {
        queryClient.setQueryData(['employees'], context.previousList)
      }

      console.error('Ошибка при создании сотрудника:', error)
      options?.onError?.(error)
    },
  })
}
