import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";


const AppRoot = () => {
    const sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay)
        })
    }
    
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

    axios.interceptors.response.use(async (response) => {
        if (import.meta.env.DEV) {
            await sleep(1000);
        }
        
        if (response.status === 401) {
            authContext.logout();
            navigate("/login");
        }

        return response;
    }, async (error) => {
        if (import.meta.env.DEV) {
            await sleep(1000);
        }

        return Promise.reject(error);
    })
    
    return (
        <Outlet />
    )
}

export default AppRoot;