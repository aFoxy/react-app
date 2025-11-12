import { createContext } from 'react'
import type { User } from '@shared/api//auth/types'

interface AuthContextType {
  user: User | null
  login: (user: User) => Promise<User>
  logout: () => void
  isLoggedIn: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
