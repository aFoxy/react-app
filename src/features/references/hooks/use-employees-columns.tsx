import type { ColumnDef } from '@tanstack/react-table'
import { NavLink, useLocation } from 'react-router'
import { Edit, Trash, View } from 'lucide-react'
import { useDeleteEmployee } from '@shared/api//employees/hooks/use-delete-employee'
import type { FilterFn } from '@tanstack/react-table'
import type { Employee } from '@shared/api//employees/types'
import { toast } from 'sonner'

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

export const useEmployeesColumns = () => {
  const { mutate: deleteItem, isPending } = useDeleteEmployee()
  const location = useLocation()

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure?')) return

    deleteItem(id, {
      onSuccess: () => {
        toast.success('Employee deleted')
      },
      onError: (error: Error) => {
        toast.error(error?.message || 'Employee delete error')
      },
    })
  }

  const columns: ColumnDef<Employee>[] = [
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
        return (
          <div className="text-right font-medium text-blue-500">{row.getValue('hireDate')}</div>
        )
      },
      filterFn: dateRangeFilterFn,
    },
    {
      accessorKey: 'actions',
      header: () => <div></div>,
      size: 100,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <NavLink
              to={`/refs/${row.original.id}`}
              state={{ fromList: true, searchParams: location.search }}
              title="View details"
            >
              <View />
            </NavLink>
            <NavLink
              to={`/refs/${row.original.id}/edit`}
              state={{ fromList: true, searchParams: location.search }}
              title="Edit"
            >
              <Edit />
            </NavLink>
            <button
              onClick={() => handleDelete(row.original.id)}
              disabled={isPending}
              title="Delete"
            >
              <Trash />
            </button>
          </div>
        )
      },
    },
  ]

  return columns
}
