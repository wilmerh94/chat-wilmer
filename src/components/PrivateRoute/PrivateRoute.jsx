import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

export const PrivateRoute = () => {
  const { authIsReady, user } = useAuthContext();
  if (user === null) return <div> Loading...</div>;

  return authIsReady ? <Outlet /> : <Navigate to="/sign-up" />;
};
