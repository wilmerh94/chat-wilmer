import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../Hooks/useAuthContext'

export const PrivateRoute = () => {
  const { user } = useAuthContext()

  return user ? <Outlet /> : <Navigate to='/login' />
}
