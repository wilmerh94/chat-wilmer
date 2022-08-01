import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../firebase/config'

export const useFetching = collectionName => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [listings, setListings] = useState([])

  // Fetching Data
  useEffect(() => {
    setError(null)
    setIsLoading(true)
    try {
      const q = query(collection(db, collectionName))
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, querySnapshot => {
        if (querySnapshot.empty) {
          toast.error('No tacos to load')
        } else {
          const results = []
          querySnapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() })
          })

          //   Update State
          setListings(results)
          setIsLoading(false)
          setError(null)
        }
      })
    } catch (err) {
      console.log(err.message)
      toast.error(err)
      setError(err.message)
      setIsLoading(false)
    }
  }, [collectionName])

  return { error, isLoading, listings }
}
