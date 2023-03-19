import {
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
                justifyContent={"flex-end"}
                alignItems={"center"}
                sx={{
                    ":hover": {
                        cursor: "pointer"
                    }
                }}
            >
                <AccountCircleIcon />
                <Typography padding={1}>
                    {currentUser?.username}
                </Typography>
            </Box>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={"bottom-start"}
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
                                    {[currentUser?.isAuthor, currentUser?.isAdmin].some((x) => x === true) &&
                                        <MenuItem onClick={() => {
                                            if (authorPanelRef !== null) {
                                                authorPanelRef.current?.click();
                                            }
                                        }}>
                                            <Link ref={authorPanelRef} underline={"none"} color={"inherit"} component={RouterLink} to={"/authorPanel"}>
                                                Author Panel
                                            </Link>
                                        </MenuItem>
                                    }
                                    <MenuItem onClick={() => {
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