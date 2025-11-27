import { Form } from 'react-router'
import { Input } from '@shared/ui/input'
import { Controller, useWatch } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import { Field, FieldContent, FieldError, FieldLabel } from '@shared/ui/field'
import { Switch } from '@shared/ui/switch'
import { usePositionsByDepartment } from '@shared/api/employees/hooks/use-employees-postitions'
import { useEffect, useState } from 'react'
import { useDebounce } from '@shared/hooks/use-debounce'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'
import { useCreateEmployeeForm } from '@features/references/hooks/use-create-employee-form'
import WizardSteps from '@shared/components/WizardSteps'
import { Button } from '@shared/ui/button'
import { findStepByServerError } from '@shared/lib/form-helpers'

type FieldName = keyof CreateEmployeeFields | 'root' | `root.${string}`

const STEP_TITLE = ['Personal Info', 'Department and Position', 'Additional Info']
const STEP_FIELDS: readonly (keyof CreateEmployeeFields)[][] = [
  ['name', 'email', 'phone', 'isActive'],
  ['department', 'position'],
  ['hireDate', 'salary'],
]

type EmployeeFormProps = {
  departments: string[]
  onSubmit: (formValue: CreateEmployeeFields) => void
  onValueChange: (formValue: Partial<CreateEmployeeFields>) => void
  isPending: boolean
  employee?: Partial<CreateEmployeeFields>
  serverError?: Record<FieldName, string>
}

export const EmployeeCreateWizard = ({
  employee,
  onSubmit,
  onValueChange,
  departments,
  isPending,
  serverError,
}: EmployeeFormProps) => {
  const [step, setStep] = useState(0)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    getFieldState,
    formState: { isDirty },
    trigger,
  } = useCreateEmployeeForm({
    initValue: employee,
  })

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isValid = await trigger(STEP_FIELDS[step])

    if (!isValid) return

    setStep((s) => s + 1)
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const values = useWatch({ control })
  const debouncedValues = useDebounce(values, 500)

  useEffect(() => {
    if (isDirty) {
      onValueChange(debouncedValues)
    }
  }, [debouncedValues, onValueChange, isDirty])

  const selectedDepartment = watch('department')
  const { data = [] } = usePositionsByDepartment(selectedDepartment)

  useEffect(() => {
    if (selectedDepartment && getFieldState('department').isDirty) {
      setValue('position', '')
    }
  }, [selectedDepartment, getFieldState, setValue])

  useEffect(() => {
    if (!serverError || !Object.keys(serverError).length) {
      return
    }

    const idx = findStepByServerError(serverError, STEP_FIELDS)
    setStep(idx >= 0 ? idx : 0)

    Object.entries(serverError).forEach(([name, message]) => {
      setError(name as FieldName, { type: 'server', message: String(message) })
    })
  }, [serverError, setError])

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">{STEP_TITLE[step]}</h2>
        <WizardSteps step={step} stepsCount={3}></WizardSteps>
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-[270px] flex-col justify-between gap-6"
        noValidate
      >
        {step === 0 && (
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
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Name"
                    />
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
                      <FieldLabel htmlFor="isActive">
                        {field.value ? 'Active' : 'Inactive'}
                      </FieldLabel>
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
                    <Input
                      {...field}
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="Phone"
                    />
                    <FieldError>{fieldState.error?.message}</FieldError>
                  </Field>
                )}
              />
            </div>
          </div>
        )}

        {step === 1 && (
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
                    disabled={!values.department}
                  >
                    <SelectTrigger id="position">
                      <SelectValue placeholder={field.value || 'Select position...'} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {data.map((position) => (
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
        )}

        {step === 2 && (
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
        )}

        <div className="mt-8 flex gap-4">
          <Button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Previous
          </Button>

          {step < 2 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="ml-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Next →
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="ml-auto rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isPending ? 'Creating...' : 'Create'}
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}
