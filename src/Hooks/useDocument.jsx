import { doc, getDoc } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

export const useDocument = collectionName => {
  const navigate = useNavigate();
  const params = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(null);

  // Fetching Data for a single item
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const fetchingData = async () => {
      try {
        const docRef = doc(db, collectionName, params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocument({
            ...docSnap.data()
          });
        } else {
          navigate('/');
          toast.error('Listing does not exist');
        }
      } catch (err) {
        toast.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchingData();
  }, [params.id, navigate, collectionName]);

  const onEdit = listingId => navigate(`/edit-listing/${listingId}`);

  return { error, isLoading, document, onEdit };
};
