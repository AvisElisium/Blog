import {Navigate, Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


const AuthPage = () => {
    const {currentUser} = useContext(AuthContext);
    
    if (currentUser !== null) return <Navigate to={"/"} />;
    
    return (
        <Grid container justifyContent={"center"} alignItems={"center"} sx={{
            minHeight: "100vh",
            alignItems: "center"
        }}>
            <Grid item>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default AuthPage;