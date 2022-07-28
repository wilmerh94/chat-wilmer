import {
  addDoc,
  collection,
  doc,
  getDoc,
  refEqual,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { useNavigate, useParams } from 'react-router-dom';
export const useStorageImg = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const docRef = doc(db, 'tacos', params.listingId);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0.0,
    description: '',
    image: {}
  });

  //  Fetch Listing to edit
  useEffect(() => {
    setIsLoading(true);
    const fetchListing = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({
          ...docSnap.data()
        });
        setIsLoading(false);
      } else {
        navigate('/');
        toast.error('Taco does not exist');
      }
    };
    fetchListing();
  }, [params.listingId, navigate]);

  // Storage Image
  const editItem = async formData => {
    const { image } = formData;
    const storageImage = async image => {
      console.log(image);
      if (image.length > 2) {
        toast.error('You can only upload up to 2 images');
        return;
      }
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          error => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              downloadURL => {
                resolve(downloadURL);
              }
            );
          }
        );
      });
    };
    const imgUrl = await Promise.all(
      [...image].map(image => storageImage(image))
    ).catch(() => {
      setIsLoading(false);
      toast.error('Images not uploaded');
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrl
    };
    delete formDataCopy.image;

    // Update listing

    await updateDoc(docRef, formDataCopy);
    setIsLoading(false);
    toast.success('Listing saved');
    navigate(`/`);
  };

  return {
    error,
    isLoading,
    editItem,
    formData,
    setFormData
  };
};
