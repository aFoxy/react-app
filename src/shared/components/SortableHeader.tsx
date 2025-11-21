import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

export function SortableHeader<T>(headerText: string, column: Column<T>) {
  return (
    <div className="flex-1 cursor-pointer select-none" onClick={column.getToggleSortingHandler()}>
      <div className="flex items-center gap-2">
        {headerText}
        {column.getIsSorted() === 'asc' && <ArrowUp size="16" />}
        {column.getIsSorted() === 'desc' && <ArrowDown size="16" />}
      </div>
    </div>
  )
}
