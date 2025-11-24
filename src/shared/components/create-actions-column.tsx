import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@shared/ui/button'

interface ActionConfig<TData> {
  label: string
  icon?: React.ReactNode
  onClick: (row: TData) => void
  variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null
}

export function createActionsColumn<TData>(actions: ActionConfig<TData>[]): ColumnDef<TData> {
  return {
    id: 'actions',
    size: 20,
    cell: ({ row }) => (
      <div className="inline-flex gap-1">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant ?? 'ghost'}
            className="size-8 p-0"
            title={action.label}
            onClick={() => action.onClick(row.original)}
          >
            {action.icon}
          </Button>
        ))}
      </div>
    ),
  }
}
