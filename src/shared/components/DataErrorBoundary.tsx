import { isRouteErrorResponse, useRouteError } from 'react-router'

export function DataErrorBoundary() {
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
        <h1>Ошибка загрузки данных</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return null
}
