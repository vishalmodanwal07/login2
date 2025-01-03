import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshToken()
        return api(originalRequest)
      } catch (refreshError) {
        // Handle refresh token error (e.g., logout user)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export const login = async (email, password) => {
  const response = await api.post('/api/user/login', { email, password })
  return response.data
}

export const signup = async (email, password) => {
  const response = await api.post('/api/user/signup', { email, password })
  return response.data
}

export const logout = async () => {
  const response = await api.post('/api/user/logout')
  return response.data
}

export const refreshToken = async () => {
  const response = await api.post('/api/user/refresh-token', {
    refreshToken: Cookies.get('refresh_token'),
  })
  const { access_token, refresh_token } = response.data
  Cookies.set('access_token', access_token, { expires: 2 }) // 2 days
  Cookies.set('refresh_token', refresh_token, { expires: 10 }) // 10 days
  return response.data
}

export default api

