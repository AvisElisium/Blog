import CommentItem from "./CommentItem";
import {Stack} from "@mui/material";
import {FC} from "react";
import {Comment} from "./CommentsSection";
import {HubConnection} from "@microsoft/signalr";

interface Props {
    comments: Comment[]
    connection?: HubConnection;
}

const CommentList: FC<Props> = ({ comments, connection }) => {
    return (
        <Stack spacing={1}>
            {comments.map((comment) => <CommentItem
                id={comment.id}
                key={comment.id}
                authorUsername={comment.authorUsername}
                articleId={comment.articleId}
                content={comment.content}
                createdAt={comment.createdAt}
                profilePicture={comment.authorProfilePicture}
                connection={connection}
            />)}
        </Stack>
    )
}

export default CommentList;