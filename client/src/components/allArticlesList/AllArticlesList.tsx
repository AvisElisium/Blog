import { Autocomplete, Box, Grid, Pagination, TextField, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Article } from '../../types/articles/article';
import ArticleItem from './ArticleItem';
import { PaginationParams } from '../../types/pagination/paginationParams';
import { DatePicker } from '@mui/x-date-pickers';
import { Moment } from 'moment';
import { Tag } from '../authorpanel/CreateArticleForm';
import { Author } from '../../types/articles/author';
import { LoadingButton, Masonry } from '@mui/lab';
import ArticleListSkeleton from './ArticleListSkeleton';
import { useSearchParams } from 'react-router-dom';

const AllArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState(20);
  const [createdBy, setCreatedBy] = useState<string[] | null>(null);
  const [createdBefore, setCreatedBefore] = useState<string | null>(null);
  const [createdAfter, setCreatedAfter] = useState<string | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [featured, setFeatured] = useState(null);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [tagsToSelect, setTagsToSelect] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filter, setFilter] = useState(true);
  const [changePage, setChangePage] = useState(false);

  const tagsQuery = useQuery({
    queryKey: 'tags',
    queryFn: () => {
      return axios.get<Tag[]>('/tag').then((res) => res.data);
    },

    onSuccess: (data) => {
      setTagsToSelect(data);
    }
  });

  const authorsQuery = useQuery({
    queryKey: 'authors',
    queryFn: () => {
      return axios.get<Author[]>('/article/authors').then((res) => res.data);
    },

    onSuccess: (data) => {
      setAuthors(data);
    }
  });

  const query = useQuery({
    queryKey: [
      'articles',
      pageNumber,
      pageSize,
      createdBy,
      createdBefore,
      createdAfter,
      tags,
      featured
    ],
    enabled: filter || changePage,
    queryFn: () => {
      return axios
        .get<Article[]>('/article', {
          paramsSerializer: {
            indexes: null
          },
          params: {
            pageNumber,
            pageSize,
            createdBy,
            createdBefore,
            createdAfter,
            tags,
            featured
          }
        })
        .then((res) => {
          const paginationParams = JSON.parse(res.headers['pagination']) as PaginationParams;
          setMaxPageNumber(paginationParams.TotalPages);
          return res.data;
        });
    },

    onSuccess: () => {
      setFilter(false);
      setChangePage(false);
    }
  });

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setChangePage(true);
    setPageNumber(value);
  };

  const data = useMemo(() => query.data, [filter, changePage]);

  return (
    <>
      <Grid container xs={12} sx={{ marginTop: 4, marginBottom: 2 }} spacing={1}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'}>Filters</Typography>
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            sx={{ width: '100%' }}
            label={'Created Before'}
            onChange={(newValue: Moment | null) => {
              if (newValue) {
                setCreatedBefore(newValue.toISOString());
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            multiple
            renderInput={(params) => <TextField {...params} label="Include tags" />}
            options={tagsToSelect}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(e, values) => {
              setTags(values.map((tag) => tag.name));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            sx={{ width: '100%' }}
            label={'Created After'}
            onChange={(newValue: Moment | null) => {
              if (newValue) {
                setCreatedAfter(newValue.toISOString());
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            multiple
            renderInput={(params) => <TextField {...params} label="Include authors" />}
            options={authors}
            getOptionLabel={(option) => option.username}
            defaultValue={[]}
            filterSelectedOptions
            onChange={(e, values) => {
              setCreatedBy(values.map((author) => author.username));
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <LoadingButton
            onClick={() => {
              setFilter(true);
            }}
            loading={query.isLoading}
            variant={'contained'}>
            Filter
          </LoadingButton>
        </Grid>
      </Grid>
      <Box>
        {data ? (
          <Masonry
            columns={{
              xs: 1,
              md: 2,
              lg: 3
            }}
            spacing={2}>
            {data.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </Masonry>
        ) : (
          <ArticleListSkeleton />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        {maxPageNumber > 1 && (
          <Pagination
            count={maxPageNumber}
            defaultPage={1}
            onChange={handlePageChange}
            page={pageNumber}
          />
        )}
      </Box>
    </>
  );
};

export default AllArticlesList;
