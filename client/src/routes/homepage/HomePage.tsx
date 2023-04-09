import {Container, Grid} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import HomePageArticleList from "../../components/homepage/HomePageArticleList";
import HomePageFeaturedArticlesCarousel from "../../components/homepage/HomePageFeaturedArticlesCarousel";
import HomePageSection from "../../components/homepage/HomePageSection";
import Navbar from "../../components/navbar/Navbar";


const HomePage = () => {
    return (
        <>
            <Navbar />
            <Container maxWidth={"xl"}>
                <Grid container item xs={12} rowSpacing={2}>
                    {/*<HomePageSection name={"Featured Articles"}>*/}
                    {/*    <HomePageFeaturedArticlesCarousel />*/}
                    {/*</HomePageSection>*/}
                    <HomePageSection name={"Latest Articles"}>
                        <HomePageArticleList />
                    </HomePageSection>
                </Grid>
            </Container>
        </>
    )
}

export default HomePage;