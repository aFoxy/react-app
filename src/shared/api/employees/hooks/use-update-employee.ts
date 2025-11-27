import { useMutation, useQueryClient } from '@tanstack/react-query'
import { employeesService } from '@shared/api/employees/employees.service'
import type { Employee } from '@/schemas/employee-schema'
import { queryKeys } from '@shared/api/queryKeys'

interface UseUpdateEmployeeOptions {
  onSuccess?: (data: Employee) => void
  onError?: (error: Error) => void
}

export const useUpdateEmployee = (employeeId: string, options?: UseUpdateEmployeeOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Employee>) => employeesService.updateEmployee(employeeId, data),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.employees.getDetails(employeeId),
      })

      const previousEmployee = queryClient.getQueryData<Employee>(
        queryKeys.employees.getDetails(employeeId)
      )

      if (previousEmployee) {
        queryClient.setQueryData(queryKeys.employees.getDetails(employeeId), {
          ...previousEmployee,
          ...newData,
        })
      }

      return { previousEmployee }
    },

    onSuccess: (updatedEmployee) => {
      queryClient.setQueryData(queryKeys.employees.getDetails(employeeId), updatedEmployee)
      queryClient.invalidateQueries({
        queryKey: queryKeys.employees.getList(),
        type: 'active',
      })

      options?.onSuccess?.(updatedEmployee)
    },

    onError: (error: Error, _, context) => {
      if (context?.previousEmployee) {
        queryClient.setQueryData(
          queryKeys.employees.getDetails(employeeId),
          context.previousEmployee
        )
      }

      options?.onError?.(error)
    },
  })
}
