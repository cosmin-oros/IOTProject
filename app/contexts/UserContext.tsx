import React, { createContext, useState } from 'react';
import { UserProfile } from '../types';

type StoreContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
};

export const UserStoreContext = createContext<StoreContextType>({
  user: null,
  setUser: () => {}
});

export const UserStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  return (
    <UserStoreContext.Provider value={{ user, setUser }}>
      {children}
    </UserStoreContext.Provider>
  );
};