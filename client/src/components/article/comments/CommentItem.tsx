import {Avatar, Box, Grid, Paper, Stack, Typography} from "@mui/material";
import {FC} from "react";
import {Interweave} from "interweave";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment";


interface Props {
    id: string;
    authorUsername: string;
    articleId: string;
    content: string;
    createdAt: string;
    profilePicture: string | null;
}

const CommentItem: FC<Props> = ({ id, content, authorUsername, createdAt, articleId, profilePicture}) => {
    const handleDate = () => {
        const now = moment(new Date());
        const createdAtMoment = moment(createdAt).utc();
        
        let timeDiff = now.diff(createdAtMoment, "hours");
        let timespanString = "hours ago";
        
        if (timeDiff === 0) {
            return "less than hour ago";
        }

        if (timeDiff > 48) {
            timeDiff = createdAtMoment.diff(now, "days");
            timespanString = "days ago";
        }
        
        if (timeDiff > 24 * 30) {
            return moment.utc(createdAt).format("DD MMMM YYYY")
        }
        
        return `${timeDiff} ${timespanString}`
    }
    
    return (
        <Paper sx={{margin: "2em 0", padding: ".5em .25em"}}>
            <Paper elevation={0}>
                <Grid container xs={12}>
                    <Grid item xs={1} sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Avatar src={profilePicture || ""} />
                    </Grid>
                    
                    <Grid item xs={2}>
                        <Stack>
                            <Typography>
                                {authorUsername}
                            </Typography>
                            
                            <Typography>
                                {handleDate()}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                
                <Grid container xs={12}>
                    <Grid item xs={1}>
                        
                    </Grid>

                    <Grid item xs={11}>
                        <Typography>
                            <Interweave content={content} />
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}

export default CommentItem;