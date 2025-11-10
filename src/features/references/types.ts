export interface Product {
  type: 'product'
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

export interface Book {
  type: 'book'
  id: string
  title: string
  author: string
  isbn: string
  pages: number
}

export interface Employee {
  type?: 'employee'
  id: string
  name: string
  position: string
  department?: string
  email?: string
  phone?: string
  hireDate?: string
  salary?: number
  isActive?: boolean
}

export type ReferenceItem = Product | Book | Employee

export interface EmployeeFilters {
  page?: string
  size?: string
  isActive?: string
  dateFrom?: string
  dateTo?: string
  name?: string
  department?: string
}
