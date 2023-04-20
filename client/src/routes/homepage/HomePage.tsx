import { Container, Grid } from '@mui/material';
import Navbar, { NAVBAR_HEIGHT } from '../../components/navbar/Navbar';
import FeaturedArticlesSection from '../../components/homepage/FeaturedArticlesSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container
        maxWidth={'lg'}
        sx={{
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`
        }}
      >
        <FeaturedArticlesSection />
      </Container>
    </>
  );
};

export default HomePage;
