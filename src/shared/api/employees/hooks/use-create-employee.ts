import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import { queryKeys } from '@shared/api/queryKeys'
import { AxiosError } from 'axios'
import type { CreateEmployeeFields, Employee } from '@/schemas/employee-schema'

interface UseCreateEmployeeOptions {
  onSuccess?: (data: Employee) => void
  onError?: (error: AxiosError) => void
}

export const useCreateEmployee = (options?: UseCreateEmployeeOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEmployeeFields) => employeesService.createEmployee(data),

    onMutate: async (newEmployee) => {
      // Отменить активные запросы
      await queryClient.cancelQueries({
        queryKey: queryKeys.employees.getList(),
      })

      // Получить старые данные для отката
      const previousList = queryClient.getQueryData<Employee[]>(queryKeys.employees.getList())

      const tempEmployee: Employee = {
        ...newEmployee,
        id: `temp-${Date.now()}`,
      }

      // Обновить кэш сразу (optimistic)
      if (previousList) {
        queryClient.setQueryData(queryKeys.employees.getList(), {
          ...previousList,
          ...tempEmployee,
        })
      }

      return { previousList }
    },

    onSuccess: (newEmployee) => {
      // Подтвердить обновление окончательными данными
      queryClient.setQueryData(queryKeys.employees.getDetails(newEmployee.id), newEmployee)

      queryClient.invalidateQueries({
        queryKey: queryKeys.employees.getList(),
        type: 'active',
      })

      options?.onSuccess?.(newEmployee)
    },

    onError: (error: AxiosError<Record<string, string>>, _, context) => {
      // Откатить при ошибке
      if (context?.previousList) {
        queryClient.setQueryData(['employees'], context.previousList)
      }

      console.error('Ошибка при создании сотрудника:', error)
      options?.onError?.(error)
    },
  })
}
