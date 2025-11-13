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
import { useEmployeesColumns } from '@features/references/hooks/use-employees-columns'

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
  const employeeColumns = useEmployeesColumns()
  const table = useReactTable({
    data: items,
    columns: employeeColumns,
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
  }, [onPaginationChange, items.length, pagination])

  return <DataTable table={table} />
}
