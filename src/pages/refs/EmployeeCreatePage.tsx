import { Button } from '@shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useEmployeesDepartments } from '@shared/api/employees/hooks/use-employees-departments'
import { useReturnNavigation } from '@features/references/hooks/use-return-navigation'
import { useCreateEmployee } from '@shared/api/employees/hooks/use-create-employee'
import { toast } from 'sonner'
import { EmployeeCreateWizard } from '@features/references/EmployeeCreateWizard'
import { useState } from 'react'
import type { CreateEmployeeFields } from '@/schemas/employee-schema'
import { useFormDraft } from '@shared/hooks/use-form-draft'
const EMPLOYEE_DRAFT_KEY = 'employeeDraft'

export default function EmployeeCreatePage() {
  const { restoreDraft, saveDraft, clearDraft } = useFormDraft(EMPLOYEE_DRAFT_KEY)
  const [employeeDraft] = useState<Partial<CreateEmployeeFields> | undefined>(restoreDraft)

  const navigateBack = useReturnNavigation()

  const departments = useEmployeesDepartments()
  const createMutation = useCreateEmployee({
    onSuccess: (updatedEmployee) => {
      toast.success(`Employee ${updatedEmployee.name} created`)
      clearDraft()
      navigateBack()
    },
    onError: (error) => {
      if (error.status !== 400) {
        toast.error(`Employee create failed. ${error.message}`)
      }
    },
  })

  return (
    <div className="mx-auto p-4">
      <div className="flex gap-2 text-2xl">
        <Button onClick={navigateBack} variant="ghost" size="icon">
          <ArrowLeft />
        </Button>
        <h1>Create employee</h1>
      </div>
      <EmployeeCreateWizard
        departments={departments.data ?? []}
        employee={employeeDraft}
        isPending={createMutation.isPending}
        serverError={createMutation.error?.response?.data}
        onValueChange={(data) => saveDraft(data)}
        onSubmit={(data) => createMutation.mutateAsync(data)}
      />
    </div>
  )
}
