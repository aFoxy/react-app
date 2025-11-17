import { useAuth } from '@features/auth/hooks/use-auth'
import { useForm } from 'react-hook-form'

const DEFAULT_VALUES: LoginForm = {
  email: '',
  password: '',
}

type LoginForm = {
  email: string
  password: string
}

type UseLoginFormProps = {
  onSuccess: () => void
}

export const useLoginForm = ({ onSuccess }: UseLoginFormProps) => {
  const { login } = useAuth()

  const form = useForm<LoginForm>({
    defaultValues: DEFAULT_VALUES,
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      await login({
        email: data.email,
        password: data.password,
        id: crypto.randomUUID(),
      })
      onSuccess()
    } catch (err) {
      // setError('Неверный логин или пароль');
      console.error(err)
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
