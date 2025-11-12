import { createBrowserRouter } from 'react-router'
import HydrationSpinner from '@shared/components/HydrationSpinner'
import * as pages from '@/pages'
import { ProtectedRoute } from '@features/auth/ProtectedRoute'
import { Layout } from '@widgets/Layout'
import { DataErrorBoundary } from '@shared/components/DataErrorBoundary'

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
