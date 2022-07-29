import { createContext, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { useAuthStatus } from '../Hooks/useAuthStatus'
import { useFetching } from '../Hooks/useCollection'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
        isAdmin: true
      }
    default:
      return state
  }
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  const { loggedIn, user } = useAuthStatus()
  const { listings } = useFetching('users')

  useEffect(() => {
    // Verify that the user is logged in
    if (loggedIn) {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
    }
    if (loggedIn && listings.isAdmin === true) {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
    }
  }, [loggedIn])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
