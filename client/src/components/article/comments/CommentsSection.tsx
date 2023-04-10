import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {FC, useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {User} from "../../auth/LoginForm";
import CreateCommentForm from "./CreateCommentForm";
import CommentItem from "./CommentItem";
import useComments from "../../../hooks/useComments";

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
        <>
            <CreateCommentForm connection={connection} articleId={articleId} />
            {comments.map((comment) => <CommentItem
                id={comment.id} 
                key={comment.id}
                authorUsername={comment.authorUsername} 
                articleId={comment.articleId} 
                content={comment.content} 
                createdAt={comment.createdAt} 
            />)}
        </>
    )
}


export default CommentsSection;