import {Box, Grid, Link, Paper, Skeleton, Stack, Tab, Tabs, Typography} from "@mui/material";
import {Comment} from "../article/comments/CommentsSection";
import {Article} from "../../types/articles/article";
import {useQuery} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {AxiosError} from "axios/index";
import moment from "moment";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileTabPanel, {a11yProps} from "./ProfileTabPanel";
import CommentItem from "../article/comments/CommentItem";
import ArticlePost from "../article/ArticlePost";
import {Link as RouterLink} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";


export interface ProfileDto {
    username: string;
    joined: string;
    userType: number;
    lastComments: Comment[];
    lastArticles: Article[];
    profilePicture: string | null;
}

const Profile = () => {
    const [value, setValue] = useState(0);
    
    const handleChange = (e: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    
    const {username} = useParams();
    const navigate = useNavigate();

    const {isLoading, isError, data, error} = useQuery<ProfileDto, AxiosError>({
        queryKey: ["profile", username],

        queryFn: (): Promise<ProfileDto> => {
            return axios.get<ProfileDto>(`/account/${username}`).then(res => res.data);
        },

        onError: (err) => {
            if (err.response?.status === 404) navigate("/not-found");
        },
    })
    
    if (data === undefined) return <Skeleton width={100} />
    
    return (
        <Box>
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <ProfileHeader profile={data} />
                </Grid>
                
                <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation={"horizontal"} centered>
                                <Tab label="Latest Comments" {...a11yProps(0)} />
                                <Tab label="Latest Articles" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <ProfileTabPanel value={value} index={0}>
                            {data.lastComments.map((comment) => <CommentItem
                                id={comment.id}
                                key={comment.id}
                                authorUsername={comment.authorUsername}
                                articleId={comment.articleId}
                                content={comment.content}
                                createdAt={comment.createdAt}
                            />)}
                        </ProfileTabPanel>
                        <ProfileTabPanel value={value} index={1}>
                            {data.lastArticles.map((article) => {
                                return (
                                    <Grid container xs={12}>
                                        <Grid item xs={4}>
                                            image
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Stack>
                                                <Typography>
                                                    {article.headline}
                                                </Typography>

                                                <Typography>
                                                    {moment(article.createdAt).utc().format("DD MMMM YYYY HH:MM")}
                                                </Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Link component={RouterLink} to={`/article/${article.id}`}>
                                                Go to article
                                            </Link>
                                        </Grid>
                                    </Grid> 
                                )
                            })}
                        </ProfileTabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}


export default Profile;