import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // La URL de tu backend de Node
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para pegar el Token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
