import { useForm } from 'react-hook-form'
import type { Employee } from '@shared/api/employees/types'

type UseLoginFormProps = {
  initValue: Employee | undefined
}

export const useEmployeeForm = ({ initValue }: UseLoginFormProps) => {
  return useForm<Omit<Employee, 'id'>>({
    defaultValues: {
      name: initValue?.name ?? '',
      position: initValue?.position ?? '',
      department: initValue?.department ?? '',
      email: initValue?.email ?? '',
      phone: initValue?.phone ?? '',
      hireDate: initValue?.hireDate,
      salary: initValue?.salary,
      isActive: initValue?.isActive ?? true,
    },
  })
}
