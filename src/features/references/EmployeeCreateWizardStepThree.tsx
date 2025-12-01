import { Controller, type UseFormRegister } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@shared/ui/field'
import { Input } from '@shared/ui/input'
import type { Control } from 'react-hook-form'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'

interface EmployeesFilterProps {
  control: Control<CreateEmployeeFields>
  register: UseFormRegister<CreateEmployeeFields>
}

export function EmployeeCreateWizardStepThree({ control, register }: EmployeesFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="position"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel className="text-muted-foreground" htmlFor="hireDate">
              Hiring date
            </FieldLabel>
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id="hireDate"
              type="date"
              placeholder="Hiring date"
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="position"
        control={control}
        render={({ fieldState }) => (
          <Field className="gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel className="text-muted-foreground" htmlFor="salary">
              Salary
            </FieldLabel>
            <Input
              id="salary"
              aria-invalid={fieldState.invalid}
              type="number"
              placeholder="Salary"
              {...register('salary', {
                setValueAs: (v) => (v === '' ? null : Number(v)),
              })}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </div>
  )
}
