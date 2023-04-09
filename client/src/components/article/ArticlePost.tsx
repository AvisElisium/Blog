import {Button, Container, Link, Popover, Skeleton, Stack, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {Article} from "../../types/articles/article";
import React, {ReactElement, useContext, useEffect, useState} from "react";
import moment from "moment/moment";
import {Link as RouterLink} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Interweave} from "interweave";
import {AuthContext} from "../../context/AuthContext";


const ArticlePostSkeleton = () => {
    return (
        <Stack spacing={5} sx={{
            marginTop: "2em",
        }}>
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
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    
    const {isLoading, isError, data, error} = useQuery<Article, AxiosError>({
        queryKey: ["article", id],

        queryFn: (): Promise<Article> => {
            return axios.get<Article>(`/article/${id}`).then(res => res.data);
        },
        
        onError: (err) => {
            if (err.response?.status === 404) navigate("/not-found");
        },
    })
    
    const {currentUser} = useContext(AuthContext);
    
    if (isLoading || data === null || data === undefined) return <ArticlePostSkeleton />;
    
    return (
        <Stack spacing={2} component={"article"} sx={{
            marginTop: "2em",
        }}>
            <header>
                <Typography variant={"h2"}>
                    {data!.headline} {currentUser?.isAdmin && <Button onClick={handleClick}>Manage</Button>}
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
            
            <Typography id={"article-content"}>
                <Interweave content={data.content} />
            </Typography>

            <Popover
                id={open ? id : undefined}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Edit</Typography>
                <Typography sx={{ p: 2 }}>Delete</Typography>
            </Popover>
            
        </Stack>
    )
}

export default ArticlePost;