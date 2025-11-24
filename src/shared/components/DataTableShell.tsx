import { useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { flexRender, useReactTable } from '@tanstack/react-table'
import { DataTablePagination } from '@shared/components/DataTablePagination'
import type { ReactNode } from 'react'
import { Spinner } from '@shared/ui/spinner'

interface DataTableShellProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>
  toolbar?: ReactNode
  paginationOptions?: number[]
  isLoading?: boolean
  isFetching?: boolean
  emptyMessage?: string
  emptyIcon?: ReactNode
  enableVirtualization?: boolean
}

export function DataTableShell<TData>({
  table,
  toolbar,
  paginationOptions,
  isLoading = false,
  isFetching = false,
  emptyMessage = 'No results.',
  emptyIcon,
  enableVirtualization = false,
}: DataTableShellProps<TData>) {
  const hasRows = table.getRowModel().rows?.length > 0
  const rows = table.getRowModel().rows
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 48,
    overscan: 10,
    enabled: enableVirtualization && hasRows,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) : 0

  const visibleRows = useMemo(() => {
    return enableVirtualization && virtualRows.length > 0
      ? virtualRows.map((v) => rows[v.index])
      : rows
  }, [virtualRows, rows, enableVirtualization])

  return (
    <div className="flex flex-col space-y-4 overflow-hidden">
      {toolbar && <>{toolbar}</>}

      <div className="flex flex-col overflow-hidden rounded-md border">
        <div ref={tableContainerRef} className="relative h-full overflow-auto">
          {isFetching && hasRows && (
            <div className="absolute inset-0 z-50 flex w-full animate-pulse items-center justify-center rounded bg-white/10 backdrop-blur-sm"></div>
          )}
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {hasRows ? (
                <>
                  {paddingTop > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={table.getAllColumns().length}
                        style={{ height: `${paddingTop}px` }}
                      />
                    </TableRow>
                  )}

                  {visibleRows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                  {paddingBottom > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={table.getAllColumns().length}
                        style={{ height: `${paddingBottom}px` }}
                      />
                    </TableRow>
                  )}
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length} className="h-36 text-center">
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        {emptyIcon && <div>{emptyIcon}</div>}
                        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {table.getPageCount() > 0 && (
          <div className="py-3">
            <DataTablePagination table={table} paginationOptions={paginationOptions} />
          </div>
        )}{' '}
      </div>
    </div>
  )
}
