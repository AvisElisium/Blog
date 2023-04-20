import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Article } from '../../types/articles/article';
import React from 'react';
import HomepageArticleList from './HomepageArticleList';

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

  return (
    <Box>
      <Grid container xs={12} justifyContent={'center'} alignItems={'top'}>
        <Grid container xs={12} lg={12}>
          <Grid item xs={12} lg={4}>
            <Typography
              variant={'h2'}
              sx={{
                padding: theme.spacing(2),
                margin: theme.spacing(1)
              }}>
              Featured Articles
            </Typography>
          </Grid>
          {data && <HomepageArticleList articles={data} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedArticlesSection;
