import { createContext, useEffect, useReducer } from 'react';
// eslint-disable-next-line no-unused-vars
import { db } from '../firebase/config';
import { useAuthStatus } from '../Hooks/useAuthStatus';
import { useFetching } from '../Hooks/useCollection';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isLoading: false, authIsReady: true };
    case 'LOADING_USER':
      return { ...state, isLoading: true };
    case 'LOGOUT':
      return { ...state, user: null, isLoading: false };
    case 'AUTH_IS_READY':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
        isLoading: false,
        isAdmin: false
      };
    case 'ADMIN_IS_READY':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
        isLoading: false,
        isAdmin: true
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: false,
    authIsReady: false
  });

  const { loggedIn, user } = useAuthStatus();
  const { listings, isLoading } = useFetching('users');

  useEffect(() => {
    // Verify that the user is logged in
    if (loggedIn) {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    }
    if (loggedIn && listings.isAdmin === true) {
      dispatch({ type: 'ADMIN_IS_READY', payload: user });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, isLoading]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
