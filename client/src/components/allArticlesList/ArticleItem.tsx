import { Article } from '../../types/articles/article';
import React, { FC } from 'react';
import { Box, Chip, Link, Paper, Stack, Typography, useTheme } from '@mui/material';
import {Link as RouterLink} from "react-router-dom";
import Image from '@tiptap/extension-image';
import moment from 'moment';

interface Props {
  article: Article;
}

const ArticleItem: FC<Props> = ({ article }) => {
  return (
    <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
      <Stack spacing={2}>
        <Stack>
          <Typography fontWeight={'bold'}>
            <Link component={RouterLink} to={`/article/${article.id}`} underline={'hover'}>
              {article.headline}
            </Link>
          </Typography>

          <Typography fontWeight={'lighter'}>
            Created By 
            <Link component={RouterLink} to={`/profile/${article.author.username}`}>
              {" " + article.author.username}
            </Link>
          </Typography>

          <Typography fontSize={14} fontWeight={'lighter'}>
            At {moment(article.createdAt).utc().format("DD MMMM YYYY")}
          </Typography>

          {article.image && (
            <Box
              component={'img'}
              src={article.image}
              sx={{
                objectFit: 'contain',
                height: '400px',
                marginTop: 2,
              }}
            />
          )}
        </Stack>

        {article.tags.length > 0 && (
          <Box>
            {article.tags.map((tag) => (
              <Chip
                component={RouterLink}
                to={"test"}
                sx={{
                  marginLeft: 0.5,
                  marginRight: 0.5,
                }}
                label={tag.name} />
            ))}
          </Box>
        )}
      </Stack>
    </Paper>
  );
}


export default ArticleItem;