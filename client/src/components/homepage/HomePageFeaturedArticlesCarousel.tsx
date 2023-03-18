import {Box, Divider, Grid, Paper, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {Article} from "../../types/articles/article";
import {useQuery} from "react-query";
import axios from "axios";
import HomePageArticleListItem from "./HomePageArticleListItem";
import HomePAgeFeaturedArticleCarouselItem from "./HomePAgeFeaturedArticleCarouselItem";


const HomePageFeaturedArticlesCarousel = () => {

    const {isLoading, isError, data, error} = useQuery<Article[], Error>({
        queryKey: "articles",
        queryFn: (): Promise<Article[]> => {
            return axios.get<Article[]>("/article").then(res => res.data);
        },

        onSuccess: (data) => {
            console.log(data);
        }
    });
    
    return (
        <Paper component={Grid} container elevation={0}>
            <Grid item xs={12}>
                <Carousel>
                    {data && data.map((article) => <HomePAgeFeaturedArticleCarouselItem article={article} />)}
                </Carousel>
            </Grid>
        </Paper>
    )
}

export default HomePageFeaturedArticlesCarousel;