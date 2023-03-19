import {Navigate, Outlet, useNavigate} from "react-router-dom";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import {SnackbarProvider, useSnackbar} from "notistack";
import {ErrorResponse, isErrorResponse} from "./types/errors/errorResponse";
import {useQueryClient} from "react-query";


axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
axios.defaults.withCredentials = true;

const AppRoot = () => {
    const sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay)
        })
    }
    
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const queryClient = useQueryClient();
    
    
    axios.interceptors.request.use((config) => {
        
        if (authContext.currentUser?.jwtToken) {
            config.headers.Authorization = `Bearer ${authContext.currentUser?.jwtToken}`;
        }
        
        config.withCredentials = true;
        
        return config
    })

    axios.interceptors.response.use(async (response) => {
        if (import.meta.env.DEV) {
            await sleep(100);
        }

        return response;
    }, async (error: AxiosError) => {
        if (import.meta.env.DEV) {
            await sleep(100);
        }
        

        if (!error.response) return Promise.reject(error);

        if (error.response.status === 401) {
            
            await queryClient.invalidateQueries("login");
            
            enqueueSnackbar(isErrorResponse(error) ? error.response.data.message : "Unauthorized", {
                variant: "error",
                preventDuplicate: true,
            })
            
            authContext.logout();
            return navigate("/login");
        }

        return Promise.reject(error);
    })
    
    return (
        <Outlet />
    )
}

export default AppRoot;