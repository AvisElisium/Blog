import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Article } from '../../types/articles/article';
import React, { useMemo } from 'react';
import HomepageArticleList from './HomepageArticleList';
import HomePageArticleListItemSkeleton from './HomePageArticleListItemSkeleton';
import { Masonry } from '@mui/lab';

const FeaturedArticlesSection = () => {
  const { data } = useQuery({
    queryKey: ['featured articles'],

    // latest 4 featured articles
    queryFn: async () => {
      const res = await axios.get<Article[]>('/article', {
        params: {
          featured: true
        }
      });

      return res.data;
    }
  });

  const theme = useTheme();
  
  const array = useMemo(() => [1, 1, 1, 1, 1], []);

  return (
    <Box>
      <Typography
        variant={'h2'}
        sx={{
          padding: theme.spacing(2),
          margin: theme.spacing(1)
        }}>
        Featured Articles
      </Typography>
      <Box>
        <Masonry columns={{xs: 1, md: 2, lg: 3}}>
          {data && <HomepageArticleList articles={data} />}
          {!data && array.map(() => <HomePageArticleListItemSkeleton />)}
        </Masonry>
      </Box>
    </Box>
  );
};

export default FeaturedArticlesSection;
