import { type ReactNode, useState } from 'react'
import type { User } from '@shared/api/auth/types'
import { authService } from '@shared/api/auth/auth.service'
import { AuthContext } from '@features/auth/auth-context'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')

    return stored ? JSON.parse(stored) : null
  })

  const login = (user: User): Promise<User> => {
    return authService.login(user).then((value: { user: User }) => {
      setUser(value.user)
      localStorage.setItem('user', JSON.stringify(value.user))

      return value.user
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
