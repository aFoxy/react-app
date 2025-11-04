import { Form } from 'react-router'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useAuth } from '@features/auth/auth-context'

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const email = formData.get('email') as string
      login({ username: email, id: crypto.randomUUID() })
      onSuccess()
    } catch (err) {
      // setError('Неверный логин или пароль');
      console.log(err)
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">Login</h1>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input type="email" name="email" placeholder="Email Address" />
        <Input type="password" name="password" placeholder="Password" />
        <div>
          <Button
            // isLoading={login.isPending}
            type="submit"
            className="w-full"
          >
            Log in
          </Button>
        </div>
      </Form>
    </div>
  )
}
