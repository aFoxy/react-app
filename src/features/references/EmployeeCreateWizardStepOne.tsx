import { Controller } from 'react-hook-form'
import { Field, FieldContent, FieldError, FieldLabel } from '@shared/ui/field'
import { Input } from '@shared/ui/input'
import { Switch } from '@shared/ui/switch'
import type { Control } from 'react-hook-form'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'

interface EmployeesFilterProps {
  control: Control<CreateEmployeeFields>
}

export function EmployeeCreateWizardStepOne({ control }: EmployeesFilterProps) {
  return (
    <div className="space-y-2">
      <div className="grid min-h-[84px] grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <FieldLabel className="text-muted-foreground" htmlFor="name">
                Name
              </FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Name" />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Field orientation="horizontal" className="w-fit justify-self-end">
              <FieldContent>
                <FieldLabel htmlFor="isActive">{field.value ? 'Active' : 'Inactive'}</FieldLabel>
              </FieldContent>
              <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />
            </Field>
          )}
        />
      </div>

      <div className="grid min-h-[84px] grid-cols-2 gap-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <FieldLabel className="text-muted-foreground" htmlFor="email">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email Address"
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="gap-1" data-invalid={fieldState.invalid}>
              <FieldLabel className="text-muted-foreground" htmlFor="phone">
                Phone
              </FieldLabel>
              <Input {...field} id="phone" aria-invalid={fieldState.invalid} placeholder="Phone" />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />
      </div>
    </div>
  )
}
