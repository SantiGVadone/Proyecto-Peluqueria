import { AuthContext } from './AuthContext'
import type { ReactNode } from 'react'
import { useReducer, useEffect } from 'react'
import { authInitialState, authReducer } from '../reducers/loginReducer'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(authReducer, authInitialState)

  const login = (token: string) => {
    localStorage.setItem('token', token)
    dispatch({ type: 'LOGIN', payload: token })
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  //recuperamos sesion al actualizar
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({ type: 'LOGIN', payload: token })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
