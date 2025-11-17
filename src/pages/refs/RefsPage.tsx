import { useSearchParams } from 'react-router'
import { EmployeesTable } from '@features/references/EmployeeTable'
import EmployeesPage from '@pages/refs/EmployeesPage'

const TABLE_COMPONENTS = {
  // products: ProductsTable,
  // books: BooksTable,
  employees: EmployeesTable,
} as const

export default function RefsPage() {
  const [searchParams] = useSearchParams()
  const refType = searchParams.get('type') || 'employees'
  // const data = useLoaderData()

  // if (loading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;
  // if (data.length === 0) return <div>Нет данных</div>

  const TableComponent = TABLE_COMPONENTS[refType as keyof typeof TABLE_COMPONENTS]

  if (!TableComponent) {
    return <div>Неизвестный тип справочника</div>
  }

  return (
    // <div className="grid h-full gap-8 overflow-hidden">
    //   <h1>Справочники</h1>
    <EmployeesPage />
    // </div>
  )
}
