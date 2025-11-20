import type { PaginationState } from '@tanstack/react-table'

export interface Pageable<T> {
  content: T[]
  totalPages: number
  totalElements: number
  pageSize: number
  pageIndex: number
}

export type PaginationParams = PaginationState
export type SortParams = { sortBy: string }
export type Filters<T> = Partial<T & PaginationParams & SortParams>
