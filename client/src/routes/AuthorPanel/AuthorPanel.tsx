import { Box, Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import CreateArticleForm from '../../components/authorpanel/CreateArticleForm';
import AuthorActions from '../../components/authorpanel/AuthorActions';
import { useAuthStore } from '../../stores/authStore';

const AuthorPanel = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (!initialRender) {
      if (currentUser === null) {
        return navigate('/login');
      }

      if (!currentUser?.isAuthor || !currentUser.isAdmin) {
        return navigate('/');
      }
    }

    setInitialRender(false);
  }, [currentUser, initialRender]);

  return (
    <>
      <Navbar />
      <Container
        maxWidth={'xl'}
        sx={{
          display: 'flex',
          justifyContent: 'center'
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
