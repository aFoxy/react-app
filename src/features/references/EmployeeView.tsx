import { CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import type { Employee } from '@shared/api/employees/types'
import { formatSalary } from '@features/references/utils'

interface EmployeeViewProps {
  employee: Employee
}

export const EmployeeView: React.FC<EmployeeViewProps> = ({ employee }) => {
  const formatDate = (date?: string) => {
    if (!date) return '—'

    return date
  }

  return (
    <>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{employee.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{employee.position}</p>
        </div>
        <div className="flex gap-2">{employee.isActive ? 'Active' : 'Inactive'}</div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">ID</label>
              <p className="font-mono text-sm">{employee.id}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Position</label>
              <p className="text-sm">{employee.position}</p>
            </div>
            {employee.department && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Department</label>
                <p className="text-sm">{employee.department}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {employee.email && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <a
                  href={`mailto:${employee.email}`}
                  className="break-all text-sm text-blue-600 hover:underline"
                >
                  {employee.email}
                </a>
              </div>
            )}
            {employee.phone && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <a href={`tel:${employee.phone}`} className="text-sm text-blue-600 hover:underline">
                  {employee.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4">
            {employee.hireDate && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Hire date</label>
                <p className="text-sm">{formatDate(employee.hireDate)}</p>
              </div>
            )}
            {employee.salary !== undefined && (
              <div>
                <label className="text-xs font-medium text-muted-foreground">Salary</label>
                <p className="text-sm font-semibold">{formatSalary(employee.salary)}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  )
}
