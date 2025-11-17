import type { ColumnDef } from '@tanstack/react-table'
import { type Location, NavLink } from 'react-router'
import { Edit, Trash, View } from 'lucide-react'
import type { Employee } from '@shared/api/employees/types'
import { dateRangeFilterFn } from '@features/references/utils'

interface GetEmployeesColumnsParams {
  handleDelete: (id: string) => void
  location: Location
  isPending: boolean
}

export const getEmployeesColumns = ({
  handleDelete,
  location,
  isPending,
}: GetEmployeesColumnsParams) => {
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
