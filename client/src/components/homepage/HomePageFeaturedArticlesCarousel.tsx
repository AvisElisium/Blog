import {Box, Card, CardContent, CardHeader, Grid, Paper, Skeleton, Stack} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {Article} from "../../types/articles/article";
import {useQuery} from "react-query";
import axios from "axios";
import HomePAgeFeaturedArticleCarouselItem from "./HomePAgeFeaturedArticleCarouselItem";
import moment from "moment";


const CarouselSkeleton = () => {
    return (
        <Box height={{
            xs: 550,
            md: 400,
        }}>
            <Skeleton variant={"rectangular"} width={"100%"} height={"100%"}/>
        </Box>
    )
}


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
                {isLoading && <CarouselSkeleton />}
                {data &&
                    <Carousel>
                        {data.map((article) => <HomePAgeFeaturedArticleCarouselItem key={article.id} article={article} />)}
                    </Carousel>}
            </Grid>
        </Paper>
    )
}

export default HomePageFeaturedArticlesCarousel;