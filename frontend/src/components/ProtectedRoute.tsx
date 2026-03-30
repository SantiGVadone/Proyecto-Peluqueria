import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  // Si no está autenticado, lo mandamos al login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // Si está ok, renderizamos el contenido de la ruta (Outlet)
  return <Outlet />
}
