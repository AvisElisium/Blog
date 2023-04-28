import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Link, Menu, Stack,
  Toolbar,
  Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import NavbarUserMenu from './NavbarUserMenu';
import { useAuthStore } from '../../stores/authStore';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

export const NAVBAR_HEIGHT = '72px';

interface Route {
  name: string;
  route: string;
}

const Navbar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  
  const pages = useMemo<Route[]>((): Route[] => {
    
    let pages = [
      {name: "Home", route: "/"},
      {name: "All articles", route: "/articles"},
    ]
    
    if (currentUser !== null && (currentUser.isAuthor || currentUser.isAdmin)) {
      pages = [...pages, {name: "Author Panel", route: "/authorPanel"}];
    }
    
    return pages; 
  }, [currentUser])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position={'static'}
      sx={{
        maxHeight: NAVBAR_HEIGHT
      }}
    >
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters sx={{justifyContent: "space-between",}}>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={"/"}
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{
            display: {xs: "none", md: "flex"},
          }}>
            {pages.map((page) => (
              <Typography sx={{margin: "0 .5em"}}>
                <Link component={RouterLink} to={page.route} underline={"hover"} color={"inherit"}>
                  {page.name}
                </Link>
              </Typography>
            ))}
          </Box>


          <Grid>
            {currentUser !== null ? <NavbarUserMenu /> :
              <Stack direction={"row"} spacing={2}>
                <Typography>
                  <Link component={RouterLink} to={"/login"} underline={"hover"} color={"inherit"}>
                    Login
                  </Link>
                </Typography>
                <Typography>
                  <Link component={RouterLink} to={"/register"} underline={"hover"} color={"inherit"}>
                    Register
                  </Link>
                </Typography>
              </Stack>
            }
          </Grid>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
