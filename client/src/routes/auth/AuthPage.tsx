import {Outlet} from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Container, createTheme, Grid} from "@mui/material";


const AuthPage = () => {
    
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