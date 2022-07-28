import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { useEffect, useReducer, useState } from 'react';
import { db } from '../../firebase.config';
// Doing it outside the hook it will be there always and not every time the hook is use
let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'ERROR':
      return {
        isLoading: false,
        document: null,
        success: false,
        error: action.payload
      };
    case 'IS_PENDING':
      return {
        isLoading: true,
        document: null,
        success: false,
        error: null
      };
    case 'ADDED_DOCUMENT':
      return {
        isLoading: false,
        document: action.payload,
        success: true,
        error: null
      };
    case 'DELETED_DOCUMENT':
      return {
        isLoading: false,
        document: null,
        success: true,
        error: null
      };
    default:
      return state;
  }
};

export const useFireStore = collectionName => {
  const [response, dispatch] = useReducer(
    firestoreReducer,
    initialState
  );
  const [isCancelled, setIsCancelled] = useState(false);

  // Collection ref
  const ref1 = collection(db, collectionName);

  //   //   Only dispatch is not cancelled
  //   const dispatchNotCancelled = action => {
  //     if (!isCancelled) {
  //       dispatch(action);
  //     }
  //   };

  // Add Document
  const addDocument = async doc => {
    dispatch({ type: 'IS_PENDING' });

    const { uid, image } = doc;
    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        //  Store image in firebase
        const storage = getStorage();
        const fileName = `${uid}-${image.name}`;

        // Upload file and metadata to the object 'images/NAME.jpg'

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);
        // Listen for state changes, errors, and completion of the upload.

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
      [...image].map(image => storeImage(image))
    ).catch(() => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
      console.log('Images not uploaded');
      return;
    });
    const DocCopy = {
      ...doc,
      timestamp: serverTimestamp(),
      imgUrl
    };
    delete DocCopy.image;

    const addedDocument = await addDoc(ref1, DocCopy);
    dispatch({
      type: 'ADDED_DOCUMENT',
      payload: addedDocument
    });
  };

  //   Delete Document
  const deleteDocument = async id => {
    dispatch({ type: 'IS_PENDING' });
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await deleteDoc(doc(db, collectionName, id));
        dispatch({
          type: 'DELETED_DOCUMENT'
        });
      }
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  };

  // Contact
  const contactEmail = async doc => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const DocCopy = {
        ...doc,
        timestamp: serverTimestamp()
      };

      const addedDocument = await addDoc(ref1, DocCopy);
      dispatch({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument
      });
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    contactEmail,
    response
  };
};
