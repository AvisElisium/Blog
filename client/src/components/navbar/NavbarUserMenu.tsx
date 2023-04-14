import {
    Avatar,
    Box,
    ClickAwayListener,
    Container,
    Grid,
    Grow, Link,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Typography
} from "@mui/material";
import {useContext, useState, MouseEvent, useRef} from "react";
import {AuthContext} from "../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useNavigate, Link as RouterLink} from "react-router-dom";


const NavbarUserMenu = () => {
    
    const {currentUser, logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const authorPanelRef = useRef<HTMLAnchorElement | null>(null);
    
    const open = Boolean(anchorEl);
    
    const navigate = useNavigate();
    
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Grid container display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
            <Box 
                onClick={(e) => handleClick(e)}
                display={"flex"}
                zIndex={10}
                justifyContent={"flex-end"}
                alignItems={"center"}
                sx={{
                    ":hover": {
                        cursor: "pointer"
                    }
                }}
            >
                <Avatar
                    sx={{
                    width: 30,
                    height: 30,
                }} src={currentUser?.profilePicture || ""} />
                <Typography padding={1}>
                    {currentUser?.username}
                </Typography>
            </Box>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={"bottom-start"}
                sx={{
                    zIndex: 10
                }}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    onKeyDown={() => {}}
                                    autoFocusItem={open}
                                >
                                    <MenuItem tabIndex={0} onClick={() => {
                                        navigate(`/profile/${currentUser?.username}`)
                                    }}
                                    >
                                        Profile
                                    </MenuItem>
                                    {[currentUser?.isAuthor, currentUser?.isAdmin].some((x) => x === true) &&
                                        <MenuItem tabIndex={0} onClick={() => {
                                            if (authorPanelRef !== null) {
                                                navigate("/authorPanel")
                                            }
                                        }}>
                                            AuthorPanel
                                        </MenuItem>
                                    }
                                    <MenuItem tabIndex={0} onClick={() => {
                                        logout();
                                        handleClose();
                                    }}
                                    >
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
                
            </Popper>
            
        </Grid>
    )
}

export default NavbarUserMenu;