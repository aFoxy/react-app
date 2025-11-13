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
