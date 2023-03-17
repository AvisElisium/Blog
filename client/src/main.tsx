import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./routes/router";
import {QueryClient, QueryClientProvider} from "react-query";
import axios from "axios";


const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

axios.interceptors.response.use(async (response) => {
    if (import.meta.env.DEV) {
        await sleep(1000);
    }
    
    return response;
}, async (error) => {
    if (import.meta.env.DEV) {
        await sleep(1000);
    }
    
    return Promise.reject(error);
})

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
