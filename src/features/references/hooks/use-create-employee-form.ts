import { useForm } from 'react-hook-form'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEmployeeSchema } from '@/schemas/employee-schema'
import { useEffect } from 'react'

type UseLoginFormProps = {
  initValue: Partial<CreateEmployeeFields> | undefined
}

export const useCreateEmployeeForm = ({ initValue }: UseLoginFormProps) => {
  const draft = initValue

  const formMethods = useForm<CreateEmployeeFields>({
    resolver: zodResolver(CreateEmployeeSchema),
    mode: 'onBlur',
    defaultValues: {
      name: draft?.name ?? '',
      position: draft?.position ?? '',
      department: draft?.department ?? '',
      email: draft?.email ?? '',
      phone: draft?.phone ?? '',
      hireDate: draft?.hireDate ?? undefined,
      salary: draft?.salary ?? undefined,
      isActive: draft?.isActive ?? true,
    },
  })

  const selectedDepartment = formMethods.watch('department')

  useEffect(() => {
    if (selectedDepartment && formMethods.getFieldState('department').isDirty) {
      formMethods.setValue('position', '')
    }
  }, [selectedDepartment, formMethods])

  return { ...formMethods }
}
