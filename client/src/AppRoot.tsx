import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
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
    const location = useLocation();
    
    
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
            
            const message = isErrorResponse(error) ? error.response.data.message : "Session has expired";
            
            enqueueSnackbar(message, {
                variant: "error",
                preventDuplicate: true,
            })
            authContext.setHasError(true);
            authContext.logout();
            
            navigate("/login", {
                state: {
                    from: location.pathname,
                }
            });
        }

        return Promise.reject(error);
    })
    
    return (
        <Outlet />
    )
}

export default AppRoot;