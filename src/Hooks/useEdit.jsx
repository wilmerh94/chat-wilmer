import { getAuth } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query
} from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
export const useEdit = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [isCancelled, setIsCancelled] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetching Data for a single item
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const fetchingData = async () => {
      try {
        const docRef = doc(db, 'tacos', params.listingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({
            ...docSnap.data()
          });
        } else {
          navigate('/');
          toast.error('Listing does not exist');
        }
      } catch (err) {
        if (!isCancelled) {
          toast.error(err);
          setError(err.message);
          setIsLoading(false);
        }
      }
    };
    fetchingData();
  }, [params.listingId, navigate]);

  const onEdit = listingId => navigate(`/edit-listing/${listingId}`);
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, formData, onEdit, setFormData };
};
