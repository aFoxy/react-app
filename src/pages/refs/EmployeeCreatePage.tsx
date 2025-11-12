import { Button } from '@shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import { EmployeeForm } from '@features/references/EmployeeForm'
import { useEmployeesDepartments } from '@shared/api//employees/hooks/use-employees-departments'
import type { Employee } from '@shared/api//employees/types'
import { useReturnNavigation } from '@features/references/hooks/use-return-navigation'
import { useCreateEmployee } from '@shared/api/employees/hooks/use-create-employee'
import { toast } from 'sonner'

export default function EmployeeEditPage() {
  const employeeDraft: Employee = {
    position: '',
    name: '',
    id: crypto.randomUUID(),
  }
  const navigateBack = useReturnNavigation()

  const departments = useEmployeesDepartments()
  const createMutation = useCreateEmployee({
    onSuccess: (updatedEmployee) => {
      toast.success(`Employee ${updatedEmployee.name} created`)
      navigateBack()
    },
    onError: (error) => {
      toast.error(`Employee create failed. ${error.message}`)
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
      <EmployeeForm
        departments={departments.data ?? []}
        employee={employeeDraft}
        onSubmit={(data) => createMutation.mutateAsync(data)}
      />
    </div>
  )
}
