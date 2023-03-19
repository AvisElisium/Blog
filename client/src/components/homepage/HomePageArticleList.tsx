import {Box, Grid, Typography, useTheme} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import {Article} from "../../types/articles/article";
import axios, {AxiosError} from "axios";
import HomePageArticleListItem from "./HomePageArticleListItem";






const HomePageArticleList = () => {
    const {isLoading, isError, data, error} = useQuery<Article[], Error>({
        queryKey: "articles",
        queryFn: (): Promise<Article[]> => {
            return axios.get<Article[]>("/article").then(res => res.data);
        },
        
        onSuccess: (data) => {
            console.log(data);
        }
    });
    
    const {spacing} = useTheme();
    
    return (
        <Grid container item xs={12} md={6} lg={4} rowSpacing={{xs: spacing(6)}} columnSpacing={{
            md: spacing(4),
            lg: spacing(6),
        }}>
            {data && data.map((article) => <HomePageArticleListItem key={article.id} article={article} />)}
        </Grid>
    )
}

export default HomePageArticleList;