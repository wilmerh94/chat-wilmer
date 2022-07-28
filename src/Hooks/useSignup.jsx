import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const SignUp = async (name, email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      // SignUp user
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Getting uid
      const user = userCredential.user;

      if (!userCredential) {
        toast.error('Could not complete Sign Up');
      }

      //  Add Display name to user
      updateProfile(auth.currentUser, {
        displayName: name
      });
      const formDataCopy = {
        name,
        email,
        password,
        timestamp: serverTimestamp()
      };
      delete formDataCopy.password;

      //  Creating collection of Users
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success('User created successfully');
      // Dispatch login action
      dispatch({ type: 'LOGIN', payload: user });
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
      navigate('/');
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        toast.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, SignUp };
};
