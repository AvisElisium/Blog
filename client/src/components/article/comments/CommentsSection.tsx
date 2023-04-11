import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {FC, useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {User} from "../../auth/LoginForm";
import CreateCommentForm from "./CreateCommentForm";
import CommentItem from "./CommentItem";
import useComments from "../../../hooks/useComments";
import {Box, Stack, Typography} from "@mui/material";

interface Props {
    articleId: string;
}

export interface Comment {
    id: string;
    authorUsername: string;
    content: string;
    createdAt: string;
    articleId: string;
}

const CommentsSection: FC<Props> = ({ articleId }) => {
    
    const {start, stop, connection, comments} = useComments(articleId);
    
    const {currentUser} = useContext(AuthContext);
    
    const token = currentUser?.jwtToken;
    
    useEffect(() => {
        start(connection);
    }, [articleId])
    
    
    return (
        <Box sx={{marginBottom: "2em"}}>
            <Stack>
                <Typography variant={"h4"}>
                    Create Comment
                </Typography>
                <CreateCommentForm connection={connection} articleId={articleId} />
            </Stack>
            
            <Stack spacing={1}>
                {comments.map((comment) => <CommentItem
                    id={comment.id}
                    key={comment.id}
                    authorUsername={comment.authorUsername}
                    articleId={comment.articleId}
                    content={comment.content}
                    createdAt={comment.createdAt}
                />)}
            </Stack>
        </Box>
    )
}


export default CommentsSection;