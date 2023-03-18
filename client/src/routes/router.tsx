import {createBrowserRouter} from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import HomePage from "./homepage/HomePage";


const router = createBrowserRouter([
    {
        element: <AuthPage />,
        children: [
            {path: "/login", element: <LoginForm />},
            {path: "/register", element: <RegisterForm />},
        ]
    },
    {element: <HomePage />, path: "/"}
])

export default router;