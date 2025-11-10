import { Form } from 'react-router'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useAuth } from '@features/auth/auth-context'
import { useForm } from 'react-hook-form'

type LoginFormProps = {
  onSuccess: () => void
}

type LoginForm = {
  email: string
  password: string
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login } = useAuth()

  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async ({ email }: LoginForm) => {
    try {
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
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          type="email"
          placeholder="Email Address"
          {...register('email', { required: true })}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
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
