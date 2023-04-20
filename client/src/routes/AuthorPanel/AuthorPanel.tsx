import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import CreateArticleForm from '../../components/authorpanel/CreateArticleForm';
import AuthorActions from '../../components/authorpanel/AuthorActions';

const AuthorPanel = () => {
  const { currentUser } = useContext(AuthContext);
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
      <Container maxWidth={'xl'}>
        <AuthorActions />
      </Container>
    </>
  );
};

export default AuthorPanel;
