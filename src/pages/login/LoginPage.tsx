import { useNavigate, useSearchParams } from 'react-router'
import { LoginForm } from '@features/auth/LoginForm'
import { Card } from '@shared/ui/card'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('from')

  return (
    <div className="flex h-screen w-screen">
      <Card className="m-auto p-4">
        <LoginForm
          onSuccess={() => {
            navigate(`${redirectTo ? `${redirectTo}` : '/'}`, {
              replace: true,
            })
          }}
        />
      </Card>
    </div>
  )
}
