import {Card, CardActionArea, CardContent, CardHeader, Grid, Paper, Skeleton, Typography} from "@mui/material";
import {Article} from "../../types/articles/article";
import moment from "moment";

interface Props {
    article: Article;
}

const HomePAgeFeaturedArticleCarouselItem = ({article}: Props) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={4}>
                <Card sx={{
                    height: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}>
                    <CardHeader title={article.headline} subheader={moment.utc(article.createdAt).format("DD MMM YYYY")} />
                    <CardContent>
                        {article.content}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Skeleton variant={"rectangular"} width={"100%"} height={400} />
            </Grid>
        </Grid>
    )
}

export default HomePAgeFeaturedArticleCarouselItem;