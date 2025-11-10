import { createBrowserRouter, isRouteErrorResponse, useRouteError } from 'react-router'
import HydrationSpinner from '@shared/components/HydrationSpinner'
import * as pages from '@/pages'
import { ProtectedRoute } from '@features/auth/ProtectedRoute'
import { Layout } from '@widgets/Layout'

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

async function loggingMiddleware({ request }: { request: Request }, next: () => Promise<unknown>) {
  const url = new URL(request.url)
  console.log(`Starting navigation: ${url.pathname}${url.search}`)
  const start = performance.now()
  await next()
  const duration = performance.now() - start
  console.log(`Navigation completed in ${duration}ms`)
}

export const router = createBrowserRouter([
  pages.loginRoute,
  {
    path: '/',
    middleware: [loggingMiddleware],
    element: (
      <Layout>
        <ProtectedRoute />
      </Layout>
    ),
    hydrateFallbackElement: <HydrationSpinner />,
    errorElement: <DataErrorBoundary />,
    children: [
      {
        index: true,
        element: <div>Hello World</div>,
      },
      pages.dashboardRoute,
      pages.auditRoute,
      pages.refsRoute,
      pages.userRoute,
    ],
  },
  pages.notFoundRoute,
])
