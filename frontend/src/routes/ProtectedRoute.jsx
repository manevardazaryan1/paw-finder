import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
