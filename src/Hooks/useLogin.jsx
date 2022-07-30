import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

import { useAuthContext } from './useAuthContext'
export const useLogin = () => {
  const navigate = useNavigate()
  const [isCancelled, setIsCancelled] = useState(false)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const SignIn = async (email, password) => {
    setError(null)
    setIsLoading(true)
    try {
      // SignIn user
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      // Updating the online status
      const docRef = doc(db, 'users', userCredential.user.uid)
      await updateDoc(docRef, {
        online: true
      })

      // Checking if the user is already signed in
      if (!userCredential) {
        toast.error('Could not complete Login action')
      }
      if (isCancelled) {
        setIsLoading(false)
        setError(null)
      }
      toast.success(`Welcome Back ${userCredential.user.displayName}`)
      navigate('/')
      // Dispatch Login action
      dispatch({ type: 'LOGIN', payload: userCredential.user })
    } catch (err) {
      if (isCancelled) {
        console.log(err.message)
        toast.error(err)
        setError(err.message)
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isLoading, SignIn }
}
