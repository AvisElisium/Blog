import {createBrowserRouter} from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import HomePage from "./homepage/HomePage";
import AppRoot from "../AppRoot";


const router = createBrowserRouter([
    {
        element: <AppRoot />,
        children: [
            {
                element: <AuthPage />,
                children: [
                    {path: "/login", element: <LoginForm />},
                    {path: "/register", element: <RegisterForm />},
                ]
            },
            {element: <HomePage />, path: "/"}
        ]
    }
])

export default router;