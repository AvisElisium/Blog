﻿import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ErrorResponse, isErrorResponse } from './types/errors/errorResponse';
import { useQuery, useQueryClient } from 'react-query';
import { useAuthStore } from './stores/authStore';
import { User } from './components/auth/LoginForm';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const AppRoot = () => {
  const sleep = (delay: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user") as string);
      login(user);
    }
  }, [])

  axios.interceptors.response.use(
    async (response) => {
      if (import.meta.env.DEV) {
        await sleep(100);
      }

      return response;
    },
    async (error: AxiosError) => {
      if (import.meta.env.DEV) {
        await sleep(100);
      }

      if (!error.response) return Promise.reject(error);
      
      if (error.response.status === 401) {
        
        const message = isErrorResponse(error)
          ? error.response.data.message
          : 'Session has expired';

        enqueueSnackbar(message, {
          variant: 'error',
          preventDuplicate: true
        });
        
        logout();

        navigate('/login', {
          state: {
            from: location.pathname
          }
        });
      }

      return Promise.reject(error);
    }
  );
  
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (currentUser?.jwtToken) {
        config.headers.Authorization = `Bearer ${currentUser?.jwtToken}`;
      }

      config.withCredentials = true;

      return config;
    });
  }, [currentUser?.jwtToken])
  
  
  useEffect(() => {
    if (!!currentUser) {
      const interval = setInterval(() => {
        axios.get<User>('/account/refreshJwt', {
          headers: {
            "Authorization": "Bearer " + currentUser?.jwtToken,
          }
        }).then(res => login(res.data));
      }, 100000)

      return () => {
        clearInterval(interval);
      }
    }
  }, [currentUser])

  return <Outlet />;
};

export default AppRoot;
