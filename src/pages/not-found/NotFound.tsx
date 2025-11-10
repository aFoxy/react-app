import { useNavigate } from 'react-router'
import { useEffect } from 'react'

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 30000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Упс! Такой страницы не существует.</p>
      <p className="mt-2 text-sm text-gray-500">
        Вы будете перенаправлены на главную через 30 секунд.
      </p>
      <a href="/" className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        На главную
      </a>
    </div>
  )
}
