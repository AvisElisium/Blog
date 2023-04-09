import {FC} from "react";
import {Article} from "../../types/articles/article";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Link, Skeleton,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import moment from "moment";

interface Props {
    article: Article;
}

const HomePageArticleListItem = ({article}: Props) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardMedia>
                    <Skeleton variant={"rectangular"} height={352} />
                </CardMedia>
                <CardHeader title={article.headline} subheader={`${article.author.username} at ${moment.utc(article.createdAt).format("DD MMM YYYY")}`} />
                <CardActions disableSpacing>
                    <Link component={RouterLink} to={`/article/${article.id}`}>
                        Go to article
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default HomePageArticleListItem;