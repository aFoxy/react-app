import { createBrowserRouter, isRouteErrorResponse, useRouteError } from 'react-router'
import App from '@/App'
import HydrationSpinner from '@shared/components/HydrationSpinner'

function DataErrorBoundary() {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convert(module: any) {
  const { clientLoader, clientAction, default: Component, ...rest } = module

  return {
    ...rest,
    loader: clientLoader,
    action: clientAction,
    // errorElement: <DataErrorBoundary />,
    Component,
  }
}

async function loggingMiddleware({ request }: { request: Request }, next: () => Promise<unknown>) {
  const url = new URL(request.url)
  console.log(`Starting navigation: ${url.pathname}${url.search}`)
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Navigation completed in ${duration}ms`)
}

export const router = createBrowserRouter([
  {
    path: '/login',
    lazy: () => import('@pages/Login').then(convert),
  },
  {
    path: '/',
    middleware: [loggingMiddleware],
    element: <App />,
    hydrateFallbackElement: <HydrationSpinner />,
    errorElement: <DataErrorBoundary />,
    children: [
      {
        index: true,
        element: <div>Hello World</div>,
      },

      {
        path: 'dashboard',
        lazy: () => import('@pages/Dashboard').then(convert),
      },
      {
        path: 'audit',
        lazy: () => import('@pages/Audit').then(convert),
      },
      {
        path: 'refs',
        lazy: () => import('@pages/EmployeesPage').then(convert),
      },
      {
        path: '/users/:id',
        lazy: () => import('@pages/Users').then(convert),
      },
    ],
  },
  {
    path: '*',
    lazy: () => import('@pages/NotFound').then(convert),
  },
])
