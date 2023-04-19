import {Navigate, Outlet} from "react-router-dom";
import {Container, Grid} from "@mui/material";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import Navbar, {NAVBAR_HEIGHT} from "../../components/navbar/Navbar";
import AuthPageIcon from "../../components/auth/AuthPageIcon";


const AuthPage = () => {
    const {currentUser} = useContext(AuthContext);
    
    if (currentUser !== null) return <Navigate to={"/"} />;
    
    return (
        <>
            <Navbar />
            <Grid container justifyContent={"center"} alignItems={"center"} sx={{
                minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
                alignItems: "center"
            }}>
                <Grid item xs={0} lg={5}>
                    <AuthPageIcon sx={{
                        width: "100%"
                    }} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default AuthPage;