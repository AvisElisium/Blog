import {
    Grid,
    Skeleton,
    Stack,
    useTheme
} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import {Article} from "../../types/articles/article";
import axios, {AxiosError} from "axios";
import HomePageArticleListItem from "./HomePageArticleListItem";


const ArticleSkeleton = () => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}>
                <Skeleton variant={"rectangular"} height={352} />
                <Skeleton variant={"rectangular"} height={40} />
                <Skeleton variant={"rectangular"} height={20} />
            </Stack>
        </Grid>
    )
}



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
    
    const {spacing, breakpoints} = useTheme();
    
    return (
        <Grid container item xs={12} md={6} lg={4} rowSpacing={{xs: spacing(6)}} columnSpacing={{
            md: spacing(4),
            lg: spacing(6),
        }}>
            {isLoading && new Array(12).fill(null).map((v, i) => <ArticleSkeleton key={i} />)}
            {data && data.map((article) => <HomePageArticleListItem key={article.id} article={article} />)}
        </Grid>
    )
}

export default HomePageArticleList;