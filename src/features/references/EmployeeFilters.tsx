import type { EmployeeFilters } from '@features/references/types'
import { Input } from '@shared/ui/input'
import { Button } from '@shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'

interface EmployeesFilterProps {
  filters: EmployeeFilters
  onFiltersChange: (filters: EmployeeFilters) => void
}

const departments = [
  'IT',
  'Development',
  'QA',
  'Analytics',
  'Management',
  'Marketing',
  'HR',
  'Finance',
  'Sales',
  'Support',
  'Administration',
  'Architecture',
  'Quality Control',
  'DevOps',
  'Security',
]

export function EmployeesFilters({ filters, onFiltersChange }: EmployeesFilterProps) {
  const resetFilters = () => {
    onFiltersChange({
      ...filters,
      department: '',
      dateFrom: '',
      dateTo: '',
    })
  }

  return (
    <div className="flex gap-6">
      <Input
        type="date"
        className="flex-1"
        placeholder="Hiring date from"
        value={filters.dateFrom ?? ''}
        onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
      />
      <Input
        type="date"
        className="flex-1"
        placeholder="Hiring date to"
        value={filters.dateTo ?? ''}
        onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
      />
      <Select
        value={filters.department ?? ''}
        onValueChange={(value) => onFiltersChange({ ...filters, department: value })}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder={filters.department || 'Select department...'} />
        </SelectTrigger>
        <SelectContent side="top">
          {departments.map((department) => (
            <SelectItem key={department} value={department}>
              {department}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Button type="button" className="w-full" onClick={() => resetFilters()}>
          Clear
        </Button>
      </div>
    </div>
  )
}
