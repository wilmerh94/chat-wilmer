import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { useAuthStatus } from './useAuthStatus';
export const useProfile = () => {
  const auth = getAuth();
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetching Data for one user
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    try {
      if (!loggedIn) {
        const userRef = onSnapshot(
          doc(db, 'users', auth.currentUser.uid),
          doc => {
            setFormData(doc.data());
          }
        );
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  //   const onEdit = listingId => navigate(`/edit-listing/${listingId}`);

  return { error, isLoading, formData };
};
