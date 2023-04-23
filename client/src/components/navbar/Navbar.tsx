import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Toolbar,
  Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import NavbarUserMenu from './NavbarUserMenu';
import { useAuthStore } from '../../stores/authStore';

export const NAVBAR_HEIGHT = '72px';

const Navbar = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <AppBar
      position={'static'}
      sx={{
        maxHeight: NAVBAR_HEIGHT
      }}
    >
      <Container maxWidth={'xl'}>
        <Grid container alignItems={'center'} display={'flex'}>
          <Grid item xs={0} md={4} />
          <Grid item xs={8} md={4}>
            <Link component={RouterLink} to={'/'} color={'inherit'} underline={'none'}>
              <Typography
                noWrap
                fontWeight={700}
                variant={'h2'}
                variantMapping={{
                  h2: 'h1'
                }}
                sx={{ userSelect: 'none' }}
                display={'flex'}
                justifyContent={{
                  xs: 'flex-start',
                  md: 'center'
                }}
              >
                Blog
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4} display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
            {currentUser === null && (
              <Link
                component={RouterLink}
                to={'/login'}
                color={'inherit'}
                display={'flex'}
                alignItems={'center'}
                underline={'hover'}
                padding={0.25}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30
                  }}
                />
                <Typography marginLeft={0.5}>Login</Typography>
              </Link>
            )}

            {currentUser && <NavbarUserMenu />}
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Navbar;
