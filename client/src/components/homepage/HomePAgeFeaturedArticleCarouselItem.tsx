import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { Article } from '../../types/articles/article';
import moment from 'moment';
import { Interweave } from 'interweave';

interface Props {
  article: Article;
}

const HomePAgeFeaturedArticleCarouselItem = ({ article }: Props) => {
  return (
    <Grid
      container
      item
      component={Stack}
      direction={{
        xs: 'column-reverse',
        md: 'row'
      }}
      xs={12}
    >
      <Grid item xs={4}>
        <Card
          sx={{
            height: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <CardHeader
            title={article.headline}
            subheader={moment.utc(article.createdAt).format('DD MMM YYYY')}
          />
          <CardContent
            sx={{
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Interweave content={article.content} blockList={['img']} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={8}>
        {article.image === null ? (
          <Skeleton variant={'rectangular'} width={'100%'} height={400} />
        ) : (
          <Box
            sx={{
              objectFit: 'contain',
              objectPosition: 'center',
              maxHeight: 500,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img src={article.image} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default HomePAgeFeaturedArticleCarouselItem;
