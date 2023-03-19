import {createContext, FC, PropsWithChildren, useState} from "react";
import {User} from "../components/auth/LoginForm";
import {useQueryClient} from "react-query";

interface AuthContext {
    currentUser: User | null,
    login: (user: User) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContext>({
    currentUser: null,
    login: () => {},
    logout: () => {},
});


const AuthContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<User | null>(getUserFromLocalStorage());
    
    const queryClient = useQueryClient();
    
    function getUserFromLocalStorage() {
        const user = localStorage.getItem("user");
        
        if (user === null) return null;
        
        return JSON.parse(user);
    }
    
    const handleLogin = (userData: User) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }
    
    const handleLogout = async () => {
        localStorage.removeItem("user");
        await queryClient.invalidateQueries("login");
        setUser(null);
    }
    
    return (
        <AuthContext.Provider value={{
            currentUser: user,
            login: handleLogin,
            logout: handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;