import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./routes/router";
import {QueryClient, QueryClientProvider} from "react-query";
import AuthContextProvider from "./context/AuthContext";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
