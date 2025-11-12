// export interface Product {
//   type: 'product'
//   id: string
//   name: string
//   price: number
//   quantity: number
//   category: string
// }
//
// export interface Book {
//   type: 'book'
//   id: string
//   title: string
//   author: string
//   isbn: string
//   pages: number
// }
//
// export type ReferenceItem = Product | Book | Employee

export interface EmployeeFilters {
  page?: string
  size?: string
  isActive?: string
  dateFrom?: string
  dateTo?: string
  name?: string
  department?: string
}
