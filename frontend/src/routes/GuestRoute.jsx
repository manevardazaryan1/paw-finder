import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const GuestRoute = () => {
  const { isAuth } = useAuth()

  if (isAuth) {
    return <Navigate to="/reports" replace />
  }

  return <Outlet />
}

export default GuestRoute
