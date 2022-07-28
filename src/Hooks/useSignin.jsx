import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { useAuthContext } from './useAuthContext';
export const useSignIn = () => {
  const navigate = useNavigate();
  const [isCancelled, setIsCancelled] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const SignIn = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      // SignIn user
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Dispatch Login action
      dispatch({ type: 'LOGIN', payload: userCredential.user });
      // Checking if the user is already signed in
      if (!userCredential) {
        toast.error('Could not complete Sign In');
      }
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
      }
      toast.success(
        `Welcome Back ${userCredential.user.displayName}`
      );
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

  return { error, isLoading, SignIn };
};
