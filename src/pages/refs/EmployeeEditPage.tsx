import { useParams } from 'react-router'
import { Button } from '@shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import { EmployeeForm } from '@features/references/EmployeeForm'
import { useEmployee } from '@shared/api/employees/hooks/use-employee'
import { useEmployeesDepartments } from '@shared/api/employees/hooks/use-employees-departments'
import { useUpdateEmployee } from '@shared/api/employees/hooks/use-update-employee'
import { useReturnNavigation } from '@features/references/hooks/use-return-navigation'
import { toast } from 'sonner'

export default function EmployeeEditPage() {
  const { id } = useParams()
  console.log(id)
  const employee = useEmployee(id!)
  const navigateBack = useReturnNavigation()

  const departments = useEmployeesDepartments()
  const updateMutation = useUpdateEmployee(id!, {
    onSuccess: (updatedEmployee) => {
      toast.success(`Employee ${updatedEmployee.name} updated`)
      navigateBack()
    },
    onError: (error) => {
      toast.error(`Employee updated error: ${error.message}`)
    },
  })

  if (employee.isLoading) {
    return <div className="p-4">Загрузка...</div>
  }

  if (employee.error || !employee.data) {
    return <div className="p-4 text-red-600">Ошибка загрузки данных</div>
  }

  return (
    <div className="mx-auto p-4">
      <div className="flex gap-2 text-2xl">
        <Button onClick={navigateBack} variant="ghost" size="icon">
          <ArrowLeft />
        </Button>
        <h1>Edit employee</h1>
      </div>
      <EmployeeForm
        departments={departments.data ?? []}
        employee={employee.data}
        onSubmit={(data) => updateMutation.mutateAsync(data)}
      />
    </div>
  )
}
