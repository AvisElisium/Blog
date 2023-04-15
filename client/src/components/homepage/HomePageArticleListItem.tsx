import {FC} from "react";
import {Article} from "../../types/articles/article";
import {
    Box,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia, Chip,
    Grid,
    Link, Skeleton,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import moment from "moment";
import TagList from "./TagList";

interface Props {
    article: Article;
}

const HomePageArticleListItem = ({article}: Props) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardMedia>
                    {article.image === null ?
                        <Skeleton sx={{zIndex: 0}} variant={"rectangular"} height={350} /> :
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxHeight: 350,
                        }}>
                            <img src={article.image} height={350}/>
                        </Box>
                    }
                </CardMedia>
                <CardHeader title={article.headline} subheader={`${article.author.username} at ${moment.utc(article.createdAt).format("DD MMM YYYY")}`} />
                <CardActions disableSpacing>
                    <Grid container xs={12}>
                        <Grid item xs={12}>
                            <Link component={RouterLink} to={`/article/${article.id}`}>
                                Go to article
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <TagList tags={article.tags} />
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default HomePageArticleListItem;