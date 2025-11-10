import { Form } from 'react-router'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useLoginForm } from '@features/auth/use-login-form'

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { form, onSubmit } = useLoginForm({ onSuccess })

  const { register } = form

  return (
    <div>
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">Login</h1>
      <Form onSubmit={onSubmit} className="flex flex-col gap-6">
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
