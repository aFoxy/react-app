import { Controller, useFormContext } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@shared/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { usePositionsByDepartment } from '@shared/api/employees/hooks/use-employees-postitions'
import { useEmployeesDepartments } from '@shared/api/employees/hooks/use-employees-departments'

export function EmployeeCreateWizardStepTwo() {
  const { control, watch } = useFormContext()
  const selectedDepartment = watch('department')
  const departments = useEmployeesDepartments().data ?? []
  const positions = usePositionsByDepartment(selectedDepartment).data ?? []

  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="department"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="gap-1" data-invalid={fieldState.invalid}>
            <FieldLabel className="text-muted-foreground" htmlFor="department">
              Department
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              onOpenChange={(open) => {
                if (!open) field.onBlur()
              }}
            >
              <SelectTrigger id="department" data-invalid={fieldState.invalid}>
                <SelectValue placeholder={'Select department...'} />
              </SelectTrigger>
              <SelectContent side="top">
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="position"
        control={control}
        render={({ field }) => (
          <Field className="gap-1">
            <FieldLabel className="text-muted-foreground" htmlFor="position">
              Position
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedDepartment}
            >
              <SelectTrigger id="position">
                <SelectValue placeholder={field.value || 'Select position...'} />
              </SelectTrigger>
              <SelectContent side="top">
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </div>
  )
}
