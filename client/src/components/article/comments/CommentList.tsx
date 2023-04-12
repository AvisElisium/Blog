import CommentItem from "./CommentItem";
import {Stack} from "@mui/material";
import {FC} from "react";
import {Comment} from "./CommentsSection";

interface Props {
    comments: Comment[]
}

const CommentList: FC<Props> = ({ comments }) => {
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
            />)}
        </Stack>
    )
}

export default CommentList;