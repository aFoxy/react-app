import './App.css'
import { AuthProvider } from '@features/auth/AuthProvider'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import ErrorBoundary from '@shared/components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </ErrorBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
