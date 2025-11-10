import type { EmployeeFilters } from '@features/references/types'
import { EmployeesTable } from '@features/references/EmployeeTable'
import { EmployeesFilters } from '@features/references/EmployeeFilters'
import { useLoaderData } from 'react-router'
import { useTableState } from '@features/references/useTableState'
import { useCallback, useMemo, useState } from 'react'

export default function EmployeesPage() {
  const { setMultipleParams, getAllFilters, page, size } = useTableState()

  const data = useLoaderData()

  const [filters, setFilters] = useState({
    ...(getAllFilters() as EmployeeFilters),
  })

  const [filtersPending, setFiltersPending] = useState(false)

  const columnFilters = useMemo(() => {
    return Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([id, value]) => {
        if (id === 'dateFrom' || id === 'dateTo') {
          return {
            id: 'hireDate',
            value: [filters.dateFrom, filters.dateTo],
          }
        }

        return { id, value }
      })
  }, [filters])

  const pagination = useMemo(
    () => ({
      pageIndex: Math.max(0, parseInt(page) - 1),
      pageSize: parseInt(size),
    }),
    [page, size]
  )

  const handleFiltersChange = (newFilters: EmployeeFilters) => {
    setMultipleParams({ ...newFilters, page: '1' })
    setFilters(newFilters)
    setFiltersPending(true)
  }

  const handlePaginationChange = useCallback(
    (newState: { pageIndex: number; pageSize: number }) => {
      if (filtersPending) {
        setFiltersPending(false)

        return
      }

      setMultipleParams({
        page: String(newState.pageIndex + 1),
        size: String(newState.pageSize),
      })
    },
    []
  )

  return (
    <div className="container mx-auto flex h-full flex-col gap-4 py-10">
      <EmployeesFilters
        filters={filters}
        onFiltersChange={(newFilters) => handleFiltersChange(newFilters)}
      />
      <EmployeesTable
        items={data.items}
        columnFilters={columnFilters}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  )
}
