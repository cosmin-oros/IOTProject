import { useContext } from 'react';
import { UserStoreContext } from '../contexts/UserContext';
import { UserProfile } from '../types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const useUserStore = () => {
  const { user, setUser } = useContext(UserStoreContext);
  const auth = getAuth(); 

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    if (user) {
      const updatedProfile: UserProfile = { ...user, ...updatedFields };
      setUser(updatedProfile);
    }
  };

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      // Call Firebase Auth function to create a new user account
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

  const clearUserProfile = () => {
    setUser(null);
  };

  return {
    user,
    updateUserProfile,
    clearUserProfile,
    registerWithEmailAndPassword,
  };
};