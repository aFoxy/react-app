import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import type { AuditRecord } from '@shared/api/audit/types'
import type { Pageable } from '@shared/types'
import { type ReactNode, useEffect } from 'react'
import { DataTableShell } from '@shared/components/DataTableShell'
import { getAuditColumns } from '@features/audit/get-audit-columns'

interface AuditTableProps {
  data: Pageable<AuditRecord> | null
  pagination: { pageIndex: number; pageSize: number }
  sorting: SortingState
  onPaginationChange: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => void
  isLoading: boolean
  isFetching: boolean
  onSortChange: (sorting: SortingState) => void
  children: ReactNode
  rowSelection: RowSelectionState
  onRowSelectionChange: (selection: RowSelectionState) => void
}

export function AuditTable({
  data,
  pagination,
  sorting,
  rowSelection,
  onRowSelectionChange,
  onPaginationChange,
  isLoading,
  isFetching,
  onSortChange,
  children,
}: AuditTableProps) {
  const table = useReactTable({
    data: data?.content ?? [],
    rowCount: data?.totalElements ?? 0,
    columns: getAuditColumns(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: (updaterOrValue) => {
      const newSortingState =
        typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection) : updaterOrValue
      console.log(newSortingState)
      onRowSelectionChange(newSortingState)
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: { pagination, sorting, rowSelection },
    autoResetPageIndex: false,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    enableMultiSort: false,
    onSortingChange: (updaterOrValue) => {
      const newSortingState =
        typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
      onSortChange(newSortingState)
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater

      if (
        pagination.pageIndex === newPagination.pageIndex &&
        pagination.pageSize === newPagination.pageSize
      )
        return

      onPaginationChange(newPagination)
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
  }, [table, onPaginationChange, pagination])

  return (
    <DataTableShell
      enableVirtualization={true}
      isLoading={isLoading}
      isFetching={isFetching}
      table={table}
      paginationOptions={[10, 30, 50, 10000]}
      toolbar={<div className="flex items-center py-2">{children}</div>}
    />
  )
}
