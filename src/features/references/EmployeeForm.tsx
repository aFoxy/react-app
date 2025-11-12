import { Form } from 'react-router'
import { Input } from '@shared/ui/input'
import { Controller } from 'react-hook-form'
import { CardContent, CardHeader } from '@shared/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { Field, FieldContent, FieldLabel } from '@shared/ui/field'
import { Switch } from '@shared/ui/switch'
import type { Employee } from '@shared/api//employees/types'
import { useEmployeeForm } from '@features/references/hooks/use-employee-form'

type EmployeeFormProps = {
  departments: string[]
  employee: Employee | undefined
  onSubmit: (formValue: Omit<Employee, 'id'>) => void
}

export const EmployeeForm = ({ employee, onSubmit, departments }: EmployeeFormProps) => {
  const { register, control, handleSubmit } = useEmployeeForm({ initValue: employee })

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="name">
                Name
              </FieldLabel>
            </FieldContent>
            <Input id="name" placeholder="Name" {...register('name', { required: true })} />
          </Field>
        </div>

        <div className="space-y-0">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal" className="flex-1">
                <FieldContent>
                  <FieldLabel htmlFor="isActive">{field.value ? 'Active' : 'Inactive'}</FieldLabel>
                </FieldContent>
                <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="email">
                Position
              </FieldLabel>
            </FieldContent>
            <Input id="position" placeholder="Position" {...register('position')} />
          </Field>

          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Field className="gap-1">
                <FieldContent>
                  <FieldLabel className="text-muted-foreground" htmlFor="department">
                    Department
                  </FieldLabel>
                </FieldContent>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder={field.value || 'Select department...'} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="email">
                Email
              </FieldLabel>
            </FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              {...register('email', { required: true })}
            />
          </Field>
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="phone">
                Phone
              </FieldLabel>
            </FieldContent>
            <Input id="phone" placeholder="Phone" {...register('phone')} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="hireDate">
                Hiring date
              </FieldLabel>
            </FieldContent>
            <Input id="hireDate" type="date" placeholder="Hiring date" {...register('hireDate')} />
          </Field>
          <Field className="gap-1">
            <FieldContent>
              <FieldLabel className="text-muted-foreground" htmlFor="salary">
                Salary
              </FieldLabel>
            </FieldContent>
            <Input id="salary" placeholder="Salary" {...register('salary')} />
          </Field>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save
        </button>
      </CardContent>
    </Form>
  )
}
