import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContextProvider from './context/AuthContext';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <RouterProvider router={router} />
            </AuthContextProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
