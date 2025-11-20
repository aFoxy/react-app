import type { ColumnDef } from '@tanstack/react-table'
import type { AuditRecord } from '@shared/api/audit/types'
import { Edit, Trash2 } from 'lucide-react'
import { Checkbox } from '@shared/ui/checkbox'
import { createActionsColumn } from '@shared/components/create-actions-column'
import { SortableHeader } from '@shared/components/SortableHeader'

export const getAuditColumns = () => {
  const columns: ColumnDef<AuditRecord>[] = [
    {
      id: 'select-col',
      size: 20,
      header: ({ table }) => (
        <Checkbox
          disabled={!table.getRowCount()}
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? 'indeterminate'
                : false
          }
          onCheckedChange={(checked) =>
            checked ? table.toggleAllRowsSelected(checked === true) : table.resetRowSelection()
          }
        ></Checkbox>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: 'id',
      size: 20,
      header: ({ column }) => SortableHeader('ID', column),
    },
    {
      accessorKey: 'action',
      header: ({ column }) => SortableHeader('Action', column),
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => SortableHeader('Status', column),
      enableSorting: true,
    },
    {
      accessorKey: 'timestamp',
      header: ({ column }) => SortableHeader('Date', column),
      enableSorting: true,
    },
    createActionsColumn<AuditRecord>([
      {
        label: 'Edit',
        icon: <Edit className="size-4" />,
        onClick: (row) => console.log('Edit:', row.id),
      },
      {
        label: 'Delete',
        icon: <Trash2 className="size-4" />,
        onClick: (row) => console.log('Delete:', row.id),
      },
    ]),
  ]

  return columns
}
