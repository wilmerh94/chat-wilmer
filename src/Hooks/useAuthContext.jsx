import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('useAuthContext is not available');
  }
  return context;
};
