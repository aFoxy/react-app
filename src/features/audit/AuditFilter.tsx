import { Button } from '@shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select'
import type { AuditFilters } from '@features/audit/types'

const ACTIONS = ['UPDATE', 'CREATE', 'DELETE', 'EXPORT', 'IMPORT', 'READ']
const STATUSES = ['success', 'pending', 'error']

interface AuditFilterProps {
  filters: AuditFilters
  onFiltersChange: (filters: AuditFilters) => void
}

export function AuditFilter({ filters, onFiltersChange }: AuditFilterProps) {
  const resetFilters = () => {
    onFiltersChange({
      ...filters,
      action: '',
      status: '',
    })
  }

  return (
    <div className="flex gap-6">
      <Select
        value={filters.action ?? ''}
        onValueChange={(value) => onFiltersChange({ ...filters, action: value })}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder={filters.action || 'Select action...'} />
        </SelectTrigger>
        <SelectContent side="top">
          {ACTIONS.map((action) => (
            <SelectItem key={action} value={action}>
              {action}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status ?? ''}
        onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder={filters.status || 'Select status...'} />
        </SelectTrigger>
        <SelectContent side="top">
          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <Button type="button" className="w-full" onClick={() => resetFilters()}>
          Clear
        </Button>
      </div>
    </div>
  )
}
