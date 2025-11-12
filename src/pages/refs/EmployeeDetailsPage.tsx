import { useParams } from 'react-router'
import { EmployeeView } from '@features/references/EmployeeView'
import { Button } from '@shared/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useEmployee } from '@shared/api//employees/hooks/use-employee'
import { useReturnNavigation } from '@features/references/hooks/use-return-navigation'

export default function EmployeePage() {
  const { id } = useParams()
  const navigateBack = useReturnNavigation()
  const employee = useEmployee(id!)

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
        <h1>Employee details</h1>
      </div>
      <EmployeeView employee={employee.data} />
    </div>
  )
}
