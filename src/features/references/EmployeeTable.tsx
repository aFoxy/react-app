import type { Employee } from '@features/references/types'
import { employeeColumns } from '@features/references/columns'
import { DataTable } from '@shared/components/DataTable'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnFiltersState } from '@tanstack/react-table'
import { useEffect } from 'react'

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
  const table = useReactTable({
    data: items,
    columns: employeeColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination, columnFilters: columnFilters },
    onColumnFiltersChange: () => {},
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater

      if (!table.getPageCount()) return

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
  }, [table.getFilteredRowModel().rows.length, pagination.pageIndex, pagination.pageSize])

  return <DataTable table={table} />
}
