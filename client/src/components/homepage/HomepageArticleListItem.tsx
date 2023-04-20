import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment/moment';
import { Interweave } from 'interweave';
import React, { FC, ReactNode } from 'react';
import { Article } from '../../types/articles/article';

interface Props {
  article: Article;
}

const HomepageArticleListItem: FC<Props> = ({ article }) => {
  const theme = useTheme();

  const interweaveText = (node: HTMLElement, children: ReactNode[]): ReactNode => {
    return <Typography noWrap>{children}</Typography>;
  };

  return (
    <Grid key={article.id} item xs={12} lg={4}>
      <Card
        sx={{
          padding: theme.spacing(2),
          margin: theme.spacing(1)
        }}>
        <CardHeader
          avatar={<Avatar src={article.author.profilePicture || ''} aria-label="recipe" />}
          title={
            <Typography
              sx={{
                overflowWrap: 'break-word'
              }}
              fontWeight={'bold'}
              textOverflow={'ellipsis'}>
              <Link sx={{padding: ".25em 0"}} component={RouterLink} to={`/article/${article.id}`} underline={"none"} color={"inherit"}>
                {article.headline}
              </Link>
            </Typography>
          }
          subheader={
            <Typography fontWeight={'lighter'}>
              <Link
                component={RouterLink}
                to={`/profile/${article.author.username}`}
                underline={'hover'}>
                {article.author.username}
              </Link>{' '}
              at {moment(article.createdAt).utc().format('DD MMMM YYYY')}
            </Typography>
          }
        />
        <CardMedia component="img" height="194" image={article.image as string} />
        <CardContent>
          <Interweave
            transform={interweaveText}
            content={article.content}
            blockList={['img']}
            noWrap
          />
        </CardContent>
        <CardActions>
          {article.tags.map((tag) => (
            <Link component={RouterLink} to={'/'}>
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{
                  ':hover': {
                    cursor: 'pointer'
                  }
                }}
              />
            </Link>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HomepageArticleListItem;
