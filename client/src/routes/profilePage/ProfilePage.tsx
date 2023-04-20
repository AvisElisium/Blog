import { Container } from '@mui/material';
import Profile from '../../components/profile/Profile';
import Navbar from '../../components/navbar/Navbar';

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={'lg'} sx={{ marginTop: '2em' }}>
        <Profile />
      </Container>
    </>
  );
};

export default ProfilePage;
