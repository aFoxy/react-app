import { Form } from 'react-router'
import { useWatch } from 'react-hook-form'
import { usePositionsByDepartment } from '@shared/api/employees/hooks/use-employees-postitions'
import { useEffect, useState } from 'react'
import { useDebounce } from '@shared/hooks/use-debounce'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'
import { useCreateEmployeeForm } from '@features/references/hooks/use-create-employee-form'
import WizardSteps from '@shared/components/WizardSteps'
import { Button } from '@shared/ui/button'
import { findStepByServerError } from '@shared/lib/form-helpers'
import { EmployeeCreateWizardStepOne } from '@features/references/EmployeeCreateWizardStepOne'
import { EmployeeCreateWizardStepTwo } from '@features/references/EmployeeCreateWizardStepTwo'
import { EmployeeCreateWizardStepThree } from '@features/references/EmployeeCreateWizardStepThree'

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
  const selectedDepartment = watch('department')
  const { data = [] } = usePositionsByDepartment(selectedDepartment)

  useEffect(() => {
    if (isDirty) {
      onValueChange(debouncedValues)
    }
  }, [debouncedValues, onValueChange, isDirty])

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
        {step === 0 && <EmployeeCreateWizardStepOne control={control} />}

        {step === 1 && (
          <EmployeeCreateWizardStepTwo
            control={control}
            departments={departments}
            positions={data}
            department={values.department}
          />
        )}

        {step === 2 && <EmployeeCreateWizardStepThree control={control} register={register} />}

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
