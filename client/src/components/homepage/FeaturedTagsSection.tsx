import { Box, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Tag } from '../authorpanel/CreateArticleForm';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import TagList from './TagList';
import { Article } from '../../types/articles/article';
import HomepageArticleList from './HomepageArticleList';

const FeaturedTagsSection = () => {
  const theme = useTheme();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  const tagsQuery = useQuery({
    queryKey: ['featured tags'],

    queryFn: async () => {
      return await axios.get<Tag[]>('/tag', {
        params: {
          isFeatured: true
        }
      });
    },

    onSuccess: (response: AxiosResponse<Tag[]>) => {
      setTags(response.data);
      setSelectedTag(response.data[0].name);
    }
  });

  const articlesQuery = useQuery({
    queryKey: ['articles', selectedTag],

    queryFn: async () => {
      return await axios.get<Article[]>('/article', {
        params: {
          pageSize: 4,
          tags: selectedTag
        }
      });
    },

    onSuccess: (response: AxiosResponse<Article[]>) => {
      setArticles(response.data);
    },

    enabled: !!selectedTag
  });

  const handleClick = (tagName: string) => {
    setSelectedTag(tagName);
  };

  return (
    <Box>
      <Grid container xs={12} justifyContent={'center'} alignItems={'top'}>
        <Grid xs={12}>
          <Grid container xs={12} lg={12}>
            <Grid item xs={12} lg={12}>
              <Typography variant={'h2'}>Featured tags</Typography>
            </Grid>

            <Grid container xs={12} lg={4}>
              {tags.map((tag) => (
                <Grid item xs={6}>
                  <Chip
                    onClick={() => handleClick(tag.name)}
                    variant={tag.name === selectedTag ? 'filled' : 'outlined'}
                    label={tag.name}
                    size={'medium'}
                  />
                </Grid>
              ))}
            </Grid>

            <HomepageArticleList articles={articles} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedTagsSection;
