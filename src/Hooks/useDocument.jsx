import { doc, onSnapshot } from 'firebase/firestore';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase/config';

export const useDocument = collectionName => {
  const params = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(null);
  // Fetching data in real time
  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const unsub = onSnapshot(
      doc(db, collectionName, params.id),
      doc => {
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
        } else {
          toast.error('Listing does not exist');
        }
      },
      err => {
        toast.error(err);
      }
    );
    return () => unsub();
  }, [collectionName, params.id]);

  // Fetching Data for a single item
  // useEffect(() => {
  //   setError(null);
  //   setIsLoading(true);
  //   const fetchingData = async () => {
  //     try {
  //       const docRef = doc(db, collectionName, params.id);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setDocument({
  //           ...docSnap.data()
  //         });
  //       } else {
  //         navigate('/');
  //         toast.error('Listing does not exist');
  //       }
  //     } catch (err) {
  //       toast.error(err);
  //       setError(err.message);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchingData();
  // }, []);

  return { error, isLoading, document };
};
