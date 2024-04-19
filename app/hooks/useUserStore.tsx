import { useContext } from 'react';
import { UserStoreContext } from '../contexts/UserContext';
import { UserProfile } from '../types';

export const useUserStore = () => {
  const { user, setUser } = useContext(UserStoreContext);

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    if (user) {
      const updatedProfile: UserProfile = { ...user, ...updatedFields };
      setUser(updatedProfile);
    }
  };

  const clearUserProfile = () => {
    setUser(null);
  };

  return {
    user,
    updateUserProfile,
    clearUserProfile,
  };
};