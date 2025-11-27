import { useForm } from 'react-hook-form'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEmployeeSchema } from '@/schemas/employee-schema'

type UseLoginFormProps = {
  initValue: Partial<CreateEmployeeFields> | undefined
}

export const useCreateEmployeeForm = ({ initValue }: UseLoginFormProps) => {
  const draft = initValue

  return useForm<CreateEmployeeFields>({
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
}
