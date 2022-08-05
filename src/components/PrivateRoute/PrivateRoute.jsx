import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../../Hooks/useAuthStatus';

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  // if (isLoading) return <Navigate to="/login" />;
  if (checkingStatus) return <div>Loading...</div>;

  // if (user == null)

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
