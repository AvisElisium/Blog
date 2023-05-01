import { Container } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import AllArticlesList from '../../components/allArticlesList/AllArticlesList';


const AllArticlesPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth={"lg"}>
        <AllArticlesList />
      </Container>
    </>
  )
}


export default AllArticlesPage;