import type { Employee } from '@shared/api/employees/types'
import { DataTable } from '@shared/components/DataTable'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { useEffect } from 'react'
import { getEmployeesColumns } from '@features/references/get-employees-columns'
import { toast } from 'sonner'
import { useLocation } from 'react-router'
import { useDeleteEmployee } from '@shared/api/employees/hooks/use-delete-employee'

interface EmployeesTableProps {
  items: Employee[]
  pagination: { pageIndex: number; pageSize: number }
  onPaginationChange: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => void
  columnFilters?: ColumnFiltersState
}

export function EmployeesTable({
  items,
  pagination,
  onPaginationChange,
  columnFilters,
}: EmployeesTableProps) {
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

  const table = useReactTable({
    data: items,
    columns: getEmployeesColumns({ handleDelete, location, isPending }),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination, columnFilters: columnFilters },
    autoResetPageIndex: false,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater

      if (
        pagination.pageIndex === newPagination.pageIndex &&
        pagination.pageSize === newPagination.pageSize
      )
        return

      onPaginationChange!(newPagination)
    },
  })

  useEffect(() => {
    const lastPageIndex = table.getPageCount() - 1

    if (lastPageIndex < 0) return

    if (pagination.pageIndex > lastPageIndex) {
      onPaginationChange({
        pageIndex: lastPageIndex,
        pageSize: pagination.pageSize,
      })
    }
  }, [table, onPaginationChange, items.length, pagination])

  return <DataTable table={table} />
}
