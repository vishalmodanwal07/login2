import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, signup as apiSignup, logout as apiLogout, refreshToken } from '../services/api'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('access_token')
      if (token) {
        try {
          await refreshToken()
          setIsAuthenticated(true)
          // You might want to fetch user data here
        } catch (error) {
          console.error('Token validation failed:', error)
          Cookies.remove('access_token')
          Cookies.remove('refresh_token')
        }
      }
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    setUser({ email })
    setIsAuthenticated(true)
    Cookies.set('access_token', data.access_token, { expires: 2 }) // 2 days
    Cookies.set('refresh_token', data.refresh_token, { expires: 10 }) // 10 days
  }

  const signup = async (email, password) => {
    const data = await apiSignup(email, password)
    setUser({ email })
    setIsAuthenticated(true)
    Cookies.set('access_token', data.access_token, { expires: 2 }) // 2 days
    Cookies.set('refresh_token', data.refresh_token, { expires: 10 }) // 10 days
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
    setIsAuthenticated(false)
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

