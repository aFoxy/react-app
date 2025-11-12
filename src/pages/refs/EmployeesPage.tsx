import type { EmployeeFilters } from '@features/references/types'
import { EmployeesTable } from '@features/references/EmployeeTable'
import { EmployeesFilters } from '@features/references/EmployeeFilters'
import { useCallback, useMemo } from 'react'
import { useTableState } from '@features/references/hooks/use-table-state'
import { useEmployees } from '@shared/api//employees/hooks/use-employees'
import { useEmployeesDepartments } from '@shared/api//employees/hooks/use-employees-departments'
import { Button } from '@shared/ui/button'
import { Plus } from 'lucide-react'
import { NavLink } from 'react-router'
import { Routes } from '@/app/routes'

export default function EmployeesPage() {
  const { setMultipleParams, getAllFilters, page, size } = useTableState()
  const filters = getAllFilters() as EmployeeFilters
  const employees = useEmployees()
  const departments = useEmployeesDepartments()
  const columnFilters = useMemo(() => {
    const urlFilters = getAllFilters() as EmployeeFilters

    return Object.entries(urlFilters)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([id, value]) => {
        if (id === 'dateFrom' || id === 'dateTo') {
          return {
            id: 'hireDate',
            value: [urlFilters.dateFrom, urlFilters.dateTo],
          }
        }

        return { id, value }
      })
  }, [getAllFilters])

  const handlePaginationChange = useCallback(
    (newState: { pageIndex: number; pageSize: number }) => {
      setMultipleParams({
        page: String(newState.pageIndex + 1),
        size: String(newState.pageSize),
      })
    },
    [getAllFilters]
  )

  const pagination = useMemo(
    () => ({
      pageIndex: Math.max(0, parseInt(page) - 1),
      pageSize: parseInt(size),
    }),
    [page, size]
  )

  const handleFiltersChange = (newFilters: EmployeeFilters) => {
    console.log('newFilters', newFilters)
    setMultipleParams({ ...newFilters, page: '1' })
    // setFilters(newFilters)
    // setFiltersPending(true)
  }

  let tableContent

  if (employees.data) {
    tableContent = (
      <EmployeesTable
        key="emTabl"
        items={employees.data ?? []}
        columnFilters={columnFilters}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    )
  } else if (employees.error) {
    tableContent = 'An error has occurred: ' + employees.error.message
  } else {
    tableContent = 'Loading...'
  }

  return (
    <div className="container mx-auto flex h-full flex-col gap-4 py-10">
      <NavLink to={Routes.REF_CREATE}>
        <Button className="w-fit">
          <Plus />
          Create
        </Button>
      </NavLink>
      <EmployeesFilters
        departments={departments.data ?? []}
        filters={filters}
        onFiltersChange={(newFilters) => handleFiltersChange(newFilters)}
      />
      {tableContent}
    </div>
  )
}
