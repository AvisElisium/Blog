import {AppBar, Box, Container, Divider, Grid, Link, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link as RouterLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import NavbarUserMenu from "./NavbarUserMenu";


const Navbar = () => {
    
    const {currentUser} = useContext(AuthContext);
    
    return (
        <AppBar position={"static"}>
            <Container maxWidth={"xl"}>
                <Grid container alignItems={"center"} display={"flex"}>
                    <Grid item xs={0} md={4} />
                    <Grid item xs={8} md={4}>
                        <Typography noWrap fontWeight={700} variant={"h2"} variantMapping={{
                            h2: "h1",
                        }} sx={{userSelect: "none"}} display={"flex"} justifyContent={{
                            xs: "flex-start",
                            md: "center",
                        }} >
                            Blog
                        </Typography>
                    </Grid>
                    <Grid item xs={4} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        {currentUser === null &&
                            <Link component={RouterLink} to={"/login"} color={"inherit"} display={"flex"} underline={"hover"} padding={0.25}>
                                <AccountCircleIcon />
                                <Typography marginLeft={0.5}>
                                    Login
                                </Typography>
                            </Link>
                        }

                        {currentUser && 
                            <NavbarUserMenu />
                        }
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}

export default Navbar;