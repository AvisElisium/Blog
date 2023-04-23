import { User } from '../components/auth/LoginForm';
import { createContext } from 'react';
import { create } from 'zustand';

interface AuthState {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,

  login: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({
      currentUser: user
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({
      currentUser: null
    });
  }
}));