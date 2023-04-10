import {Box, Grid, Paper} from "@mui/material";
import {FC} from "react";
import {Interweave} from "interweave";


interface Props {
    id: string;
    authorUsername: string;
    articleId: string;
    content: string;
    createdAt: string;
}

const CommentItem: FC<Props> = ({ id, content, authorUsername, createdAt, articleId}) => {
    return (
        <Box>
            <Paper elevation={1}>
                <Grid container xs={12}>
                    
                    <Grid item xs={4}>
                        {authorUsername}
                    </Grid>

                    <Grid item xs={4}>
                        <Interweave content={content} />
                    </Grid>
                    
                </Grid>
            </Paper>
        </Box>
    )
}

export default CommentItem;