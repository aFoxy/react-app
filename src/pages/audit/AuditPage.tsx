import { useTableState } from '@features/audit/hooks/use-table-state'
import { useCallback, useMemo, useState } from 'react'
import { useAuditRecords } from '@shared/api/audit/hooks/use-audit-records'
import { AuditTable } from '@features/audit/AuditTable'
import { sortByToState, stateToSortBy } from '@shared/lib/table-sort-mapper'
import type { SortingState } from '@tanstack/react-table'

import type { AuditFilters } from '@features/audit/types'
import { AuditFilter } from '@features/audit/AuditFilter'
import { Separator } from '@shared/ui/separator'
import { Button } from '@shared/ui/button'
import type { AuditRecord } from '@shared/api/audit/types'
import { auditService } from '@shared/api/audit/audit.service'
import { csvExport } from '@shared/lib/csv-export'

const EXPORT_HEADERS: Array<keyof AuditRecord> = ['id', 'action', 'status', 'timestamp']

export default function Audit() {
  const { setMultipleParams, getAllFilters, sortBy, page, size } = useTableState()
  const [rowSelection, setRowSelection] = useState({})
  const filters = getAllFilters() as AuditFilters
  const auditData = useAuditRecords({
    page: Math.max(0, parseInt(page) - 1),
    size,
    ...getAllFilters(),
  })

  const handlePaginationChange = useCallback(
    (newState: { pageIndex: number; pageSize: number }) => {
      setMultipleParams({
        page: String(newState.pageIndex + 1),
        size: String(newState.pageSize),
      })
    },
    [setMultipleParams]
  )

  const pagination = useMemo(
    () => ({
      pageIndex: Math.max(0, parseInt(page) - 1),
      pageSize: parseInt(size),
    }),
    [page, size]
  )

  const handleFiltersChange = useCallback(
    (newFilters: AuditFilters) => {
      setMultipleParams({ ...newFilters, page: '1' })
    },
    [setMultipleParams]
  )

  const handleSortChange = useCallback(
    (newState: SortingState) => {
      setMultipleParams({ sortBy: stateToSortBy(newState) ?? ('' as string) })
    },
    [setMultipleParams]
  )

  const handleExport = async () => {
    if (!Object.entries(rowSelection).length) return

    const rowsData = await auditService.getAuditRecordsForExport(Object.keys(rowSelection))
    const csvRows = [
      EXPORT_HEADERS.join(';'),
      ...rowsData.map((row) =>
        EXPORT_HEADERS.map((field) => JSON.stringify(row[field] ?? '')).join(';')
      ),
    ]
    csvExport(csvRows, 'audit-records')
  }

  return (
    <div className="container mx-auto flex h-full flex-col gap-4 py-10">
      <AuditTable
        key="emTabl"
        data={auditData.data ?? null}
        sorting={sortByToState(sortBy)}
        pagination={pagination}
        rowSelection={rowSelection}
        onSortChange={handleSortChange}
        onRowSelectionChange={setRowSelection}
        onPaginationChange={handlePaginationChange}
        isFetching={auditData.isFetching}
        isLoading={auditData.isLoading}
        editClickHandler={(row) => {
          console.log('Edit', row.id)
        }}
        deleteClickHandler={(row) => {
          console.log('Delete', row.id)
        }}
      >
        <>
          <h2>Audit Records</h2>
          <div className="flex flex-1 justify-end">
            <AuditFilter
              filters={filters}
              onFiltersChange={(newFilters) => handleFiltersChange(newFilters)}
            />
          </div>
          <Separator className="mx-4" orientation="vertical" />
          <Button
            variant="ghost"
            title="Export"
            onClick={handleExport}
            disabled={!Object.entries(rowSelection).length}
          >
            Export
          </Button>
        </>
      </AuditTable>
    </div>
  )
}
