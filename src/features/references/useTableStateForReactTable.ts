import type { ColumnFiltersState, PaginationState } from '@tanstack/react-table'
import { useSearchParams } from 'react-router'
import { useMemo } from 'react'

export const useTableStateForReactTable = () => {
  const [params] = useSearchParams()

  return useMemo(() => {
    const columnFilters: ColumnFiltersState = []
    params.forEach((value, key) => {
      if (!['page', 'size'].includes(key)) {
        columnFilters.push({ id: key, value })
      }
    })

    return {
      pagination: {
        pageIndex: Math.max(0, parseInt(params.get('page') || '1') - 1),
        pageSize: parseInt(params.get('size') || '10'),
      } as PaginationState,
      columnFilters,
    }
  }, [params])
}
