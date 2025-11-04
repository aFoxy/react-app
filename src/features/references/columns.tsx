import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { Employee } from '@features/references/types'

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

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    filterFn: 'equals',
  },
  {
    accessorKey: 'hireDate',
    header: () => <div className="text-right">Hire date</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium text-blue-500">{row.getValue('hireDate')}</div>
    },
    filterFn: dateRangeFilterFn,
  },
]
