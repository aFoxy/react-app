import { z } from 'zod'

export const CreateEmployeeSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be less than 100 characters'),
  position: z.string().optional(),
  department: z.string().nonempty('Department is required'),
  email: z.string().nonempty('Email is required').email('Invalid email format'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?\d{7,15}$/.test(val), { message: 'Invalid phone number format' }),
  hireDate: z.string().optional(),
  salary: z.number().nonnegative('Salary must be non-negative').nullable().optional(),
  isActive: z.boolean(),
})
export const EmployeeSchema = CreateEmployeeSchema.extend({ id: z.string() })

export type CreateEmployeeFields = z.infer<typeof CreateEmployeeSchema>
export type Employee = z.infer<typeof EmployeeSchema>
