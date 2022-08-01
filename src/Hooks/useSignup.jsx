/* eslint-disable default-case */
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const navigate = useNavigate()
  const [isCancelled, setIsCancelled] = useState(false)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const auth = getAuth()

  const SignUp = async (email, password, displayName, formFile) => {
    setError(null)
    setIsLoading(true)
    try {
      // SignUp user

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      //  Getting uid
      const user = userCredential.user

      if (!userCredential) {
        toast.error('Could not complete Sign Up')
      }
      // Upload picture Profile
      const storage = getStorage()

      const fileName = `${user.uid}-${formFile.name}`
      const filesImageRef = ref(storage, 'images/' + fileName)
      // NOTE: make sure to put await in firebase function to be able to update or modify anything
      // eslint-disable-next-line no-unused-vars
      const uploadTask = await uploadBytesResumable(filesImageRef, formFile)
      const imgUrl = await getDownloadURL(ref(storage, 'images/' + fileName))

      //  Add Display name and photoURL to user
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: imgUrl
      })
      const formDataCopy = {
        online: true,
        displayName,
        email,
        password,
        imgUrl
      }
      delete formDataCopy.password

      //  Creating collection of Users
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      toast.success('User created successfully')
      // Dispatch login action
      dispatch({ type: 'LOGIN', payload: user })
      if (isCancelled) {
        setIsLoading(false)
        setError(null)
      }
      navigate('/')
    } catch (err) {
      console.log(err.message)
      toast.error(err)
      setError(err.message)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { error, isLoading, SignUp }
}
