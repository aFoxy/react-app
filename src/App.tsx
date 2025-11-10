import './App.css'
import { AuthProvider } from '@features/auth/auth-context'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import ErrorBoundary from '@shared/components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
