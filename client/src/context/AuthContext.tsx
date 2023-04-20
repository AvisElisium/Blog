﻿import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';
import { User } from '../components/auth/LoginForm';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { isAsync } from 'zod';

interface AuthContext {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  setHasError: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  currentUser: null,
  login: () => {
  },
  logout: () => {
  },
  setHasError: () => {
  }
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
  const [hasError, setHasError] = useState(false);

  const queryClient = useQueryClient();

  function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');

    if (user === null) return null;

    return JSON.parse(user);
  }

  const handleLogin = async (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    await queryClient.invalidateQueries('refresh');
    setUser(userData);
    setHasError(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('user');
    await queryClient.invalidateQueries('login');
    await queryClient.invalidateQueries('refresh');
    setUser(null);
    setHasError(false);
  };

  const handleSetHasError = (v: boolean) => {
    setHasError(v);
  };

  const {} = useQuery({
    queryKey: 'refresh',
    queryFn: async () => {
      const res = await axios.get<User>('/account/refreshJwt', {});
      return res.data;
    },
    onSuccess: async (data: User) => {
      await handleLogin(data);
    },

    onError: () => {
      setHasError(true);
    },

    cacheTime: 600000,
    refetchInterval: 50000,
    enabled: !!user && !hasError,
    retry: false
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        login: handleLogin,
        logout: handleLogout,
        setHasError: handleSetHasError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
