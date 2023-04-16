import {
    Autocomplete,
    Box,
    Grid, Input, Pagination,
    Skeleton,
    Stack, TextField, Typography,
    useTheme
} from "@mui/material";
import {useQuery, useQueryClient} from "react-query";
import {Article} from "../../types/articles/article";
import axios, {AxiosError, AxiosResponse} from "axios";
import HomePageArticleListItem from "./HomePageArticleListItem";
import React, {ChangeEvent, useState} from "react";
import {PaginationParams} from "../../types/pagination/paginationParams";
import {Tag} from "../authorpanel/CreateArticleForm";
import {DatePicker} from "@mui/x-date-pickers";
import {Moment} from "moment";
import {Author} from "../../types/articles/author";


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
    const [tagsToSelect, setTagsToSelect] = useState<Tag[]>([]);
    const [authorsToSelect, setAuthorsToSelect] = useState<Author[]>([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [createdBefore, setCreatedBefore] = useState<string | null | undefined>(null);
    const [createdAfter, setCreatedAfter] = useState<string | null | undefined>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [createdBy, setCreatedBy] = useState<string[]>([]);
    const [isFeatured, setIsFeatured] = useState<boolean | null>(null);
    
    
    const {isLoading, isError, data: response, error} = useQuery<AxiosResponse<Article[], any>, AxiosError>({
        queryKey: ["articles", currentPage],

        queryFn: (): Promise<AxiosResponse<Article[], any>> => {
            return axios.get<Article[]>("/article", {
                params: {
                    pageSize: 12,
                    pageNumber: currentPage,
                    createdBefore,
                    createdAfter,
                    tags,
                    createdBy,
                    isFeatured,
                },
                paramsSerializer: {
                    indexes: null,
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
    
    const tagsQuery = useQuery<Tag[]>({
        queryKey: "tags",
        queryFn: () => {
            return axios.get<Tag[]>("/tag").then(res => res.data);
        },
        
        onSuccess: (data: Tag[]) => {
            setTagsToSelect(data)
        }
    })

    const authorsQuery = useQuery<Author[]>({
        queryKey: "authors",
        queryFn: () => {
            return axios.get<Author[]>("/Article/authors").then(res => res.data);
        },

        onSuccess: (data: Author[]) => {
            setAuthorsToSelect(data)
        }
    })
    
    
    const {spacing, breakpoints} = useTheme();
    
    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    }
    
    return (
        <>
            <Grid container xs={12}>
                <Grid container xs={12}>
                    <Grid item xs={4}>
                        <Box>
                            <Typography>
                                Created Before
                            </Typography>
                            <DatePicker onChange={(newValue: Moment | null) => setCreatedBefore(newValue?.format())} />
                        </Box>
                        <Box>
                            <Typography>
                                Created After
                            </Typography>
                            <DatePicker onChange={(newValue: Moment | null) => setCreatedAfter(newValue?.format())} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box>
                            <Typography>
                                Include tags
                            </Typography>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                onChange={(e, values) => setTags(values.map((tag) => tag.name))}
                                options={tagsToSelect}
                                getOptionLabel={(option) => option.name}
                                defaultValue={[]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Typography>
                                Include tags
                            </Typography>
                            <Autocomplete
                                multiple
                                id="authors-outlined"
                                onChange={(e, values) => setCreatedBy(values.map((author) => author.username))}
                                options={authorsToSelect}
                                getOptionLabel={(option) => option.username}
                                defaultValue={[]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Authors"
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
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