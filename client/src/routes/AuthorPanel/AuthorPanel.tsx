import { Box, Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import CreateArticleForm from '../../components/authorpanel/CreateArticleForm';
import AuthorActions from '../../components/authorpanel/AuthorActions';
import { useAuthStore } from '../../stores/authStore';

const AuthorPanel = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();

  if (currentUser === null) {
    return <Navigate to={'/login'} />;
  }

  if (!currentUser.isAuthor || !currentUser.isAdmin) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={'xl'} sx={{
        display: "flex",
        justifyContent: "center"
      }}>
        
        <Box>
          <AuthorActions />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default AuthorPanel;
