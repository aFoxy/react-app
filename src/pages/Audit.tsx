import { isRouteErrorResponse, useLoaderData, useRouteError } from 'react-router'

export async function clientLoader() {
  // throw new Error("Ошибка в clientLoader Audit");
  return {
    title: 'AUDIT',
  }
}

export default function Audit() {
  const data = useLoaderData()
  throw new Error('Ошибка в компоненте Audit')

  return <h1>{data.title}</h1>
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Ошибка {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    )
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Ошибка загрузки данных раздела Audit</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return null
}
