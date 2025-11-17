import type { FilterFn } from '@tanstack/react-table'
import type { Employee } from '@shared/api/employees/types'

export const formatSalary = (salary?: number) => {
  if (!salary) return '—'

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(salary)
}

export const dateRangeFilterFn: FilterFn<Employee> = (row, columnId, filterValue) => {
  const date = row.getValue(columnId)

  if (!date) return false

  const cellDate = new Date(date as string)
  const [startStr, endStr] = filterValue as [string, string]

  const start = startStr ? new Date(startStr) : null
  const end = endStr ? new Date(endStr) : null

  if (start && end) {
    return cellDate >= start && cellDate <= end
  }

  if (start && !end) {
    return cellDate >= start
  }

  if (!start && end) {
    return cellDate <= end
  }

  return true
}
