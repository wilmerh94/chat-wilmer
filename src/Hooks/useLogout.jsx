import { getAuth } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const auth = getAuth()
  const [isCancelled, setIsCancelled] = useState(false)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logOut = async () => {
    setError(null)
    setIsLoading(true)

    //   Sign the user out
    try {
      const { uid } = user
      console.log(uid)
      // update online status
      const docRef = await doc(db, 'users', uid)
      await updateDoc(docRef, {
        online: false
      })

      await auth.signOut()
      //  Dispatch Log Out
      dispatch({ type: 'LOGOUT' })
      if (isCancelled) {
        //  Update state
        setIsLoading(false)
        setError(null)
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message)
        toast.error(error)
        setError(error)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logOut, error, isLoading }
}
