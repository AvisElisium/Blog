import {Container, Link, Skeleton, Stack, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {Article} from "../../types/articles/article";
import {useEffect} from "react";
import moment from "moment/moment";
import {Link as RouterLink} from "react-router-dom";


const ArticlePostSkeleton = () => {
    return (
        <Stack spacing={5}>
            <Skeleton variant={"rectangular"} animation={"wave"} height={40} width={"20%"} />
            
            <Stack spacing={2}>
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
            </Stack>

            <Stack spacing={2}>
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
            </Stack>

            <Stack spacing={2}>
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
                <Skeleton variant={"rectangular"} height={20} width={"100%"} />
            </Stack>
        </Stack>
    )
}

const ArticlePost = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    
    const {isLoading, isError, data, error} = useQuery<Article, AxiosError>({
        queryKey: ["article", id],

        queryFn: (): Promise<Article> => {
            return axios.get<Article>(`/article/${id}`).then(res => res.data);
        },
        
        onError: (err) => {
            if (err.response?.status === 404) navigate("/not-found");
        },
    })
    
    if (isLoading) return <ArticlePostSkeleton />;
    
    return (
        <Stack spacing={5} component={"article"}>
            <header>
                <Typography variant={"h2"}>
                    {data!.headline}
                </Typography>
                <Typography>
                    <Link component={RouterLink} to={`/profile/${data!.author.username}`} underline={"hover"}>
                        {data!.author.username}
                    </Link>
                </Typography>
                <Typography>
                    {moment.utc(data!.createdAt).format("DD MMMM YYYY")}
                </Typography>
            </header>
            
            
            
            <Typography component={"p"}>
                {data!.content}
            </Typography>
        </Stack>
    )
}

export default ArticlePost;