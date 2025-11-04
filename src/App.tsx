import './App.css'
import { Layout } from '@widgets/Layout'
import { AuthProvider } from '@features/auth/auth-context'
import { ProtectedRoute } from '@features/auth/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Layout>
        <ProtectedRoute />
      </Layout>
    </AuthProvider>
  )
}

export default App
