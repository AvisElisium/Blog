import {
    Box,
    Grid, Pagination,
    Skeleton,
    Stack,
    useTheme
} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import {Article} from "../../types/articles/article";
import axios, {AxiosError, AxiosResponse} from "axios";
import HomePageArticleListItem from "./HomePageArticleListItem";
import {ChangeEvent, useState} from "react";
import {PaginationParams} from "../../types/pagination/paginationParams";


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


// TODO add search params
const HomePageArticleList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    
    const {isLoading, isError, data: response, error} = useQuery<AxiosResponse<Article[], any>, AxiosError>({
        queryKey: ["articles", currentPage],

        queryFn: (): Promise<AxiosResponse<Article[], any>> => {
            return axios.get<Article[]>("/article", {
                params: {
                    pageSize: 12,
                    pageNumber: currentPage,
                }
            }).then(res => res)
        },

        onSuccess: (response: AxiosResponse<Article[]>) => {
            const params = JSON.parse(response.headers["pagination"]) as PaginationParams;
            
            console.log(params);
            
            // TODO change to camelCase
            
            setPageCount(params.TotalPages);
            
            return response.data;
        }
    });
    
    
    const {spacing, breakpoints} = useTheme();
    
    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }
    
    return (
        <>
            <Grid container item xs={12} md={6} lg={4} rowSpacing={{xs: spacing(6)}} columnSpacing={{
                md: spacing(4),
                lg: spacing(6),
            }}>
                {isLoading && new Array(12).fill(null).map((v, i) => <ArticleSkeleton key={i} />)}
                {response && response.data.map((article) => <HomePageArticleListItem key={article.id} article={article} />)}
            </Grid>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                margin: "1em 0"
            }}>
                <Pagination count={pageCount} onChange={handlePageChange} />
            </Box>
        </>
    )
}

export default HomePageArticleList;