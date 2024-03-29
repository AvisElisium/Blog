﻿import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Link,
  MenuItem,
  MenuList,
  Modal,
  Paper,
  Popover,
  Skeleton,
  Stack,
  Typography, useTheme
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Article } from '../../types/articles/article';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Link as RouterLink } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Interweave } from 'interweave';
import ArticlePostSkeleton from './ArticlePostSkeleton';
import ArticleEditForm from './ArticleEditForm';
import ArticleDeleteModal from './ArticleDeleteModal';
import CreateCommentForm from './comments/CreateCommentForm';
import CommentsSection from './comments/CommentsSection';
import { useAuthStore } from '../../stores/authStore';

const ArticlePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { isLoading, isError, data, error } = useQuery<Article, AxiosError>({
    queryKey: ['article', id],

    queryFn: (): Promise<Article> => {
      return axios.get<Article>(`/article/${id}`).then((res) => res.data);
    },

    onError: (err) => {
      if (err.response?.status === 404) navigate('/not-found');
    }
  });

  const currentUser = useAuthStore((state) => state.currentUser)

  if (isLoading || data === null || data === undefined) return <ArticlePostSkeleton />;

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleCloseDeleteMode = () => {
    setDeleteMode(false);
  };

  if (editMode)
    return (
      <ArticleEditForm
        initialTags={data.tags}
        initialIsFeatured={data.isFeatured}
        initialHeadline={data.headline}
        initialContent={data.content}
        initialImage={data.image}
        id={id as string}
        closeEditMode={handleCloseEditMode}
      />
    );

  return (
    <>
      <Stack
        spacing={2}
        component={'article'}
        sx={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
        }}>
        <header>
          <Typography variant={'h2'}>
            {data!.headline}{' '}
            {currentUser?.isAdmin && !editMode && <Button onClick={handleClick}>Manage</Button>}
          </Typography>
          <Stack
            direction={'row'}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <Avatar src={data.author.profilePicture || ''} />

            <Box
              sx={{
                marginLeft: theme.spacing(0.4)
              }}>
              <Typography>
                <Link
                  component={RouterLink}
                  to={`/profile/${data!.author.username}`}
                  underline={'hover'}>
                  {data!.author.username}
                </Link>
              </Typography>
              <Typography>{moment.utc(data!.createdAt).format('DD MMMM YYYY')}</Typography>
            </Box>
          </Stack>
        </header>

        <Typography component={'div'}>
          <Interweave content={data.content} />
        </Typography>

        {data.tags.length > 0 && (
          <Stack>
            <Typography variant={'h4'} sx={{ margin: `0 ${theme.spacing(0.25)}` }}>
              Tags
            </Typography>
            <Stack direction={'row'}>
              {data.tags.map((tag) => (
                <Link component={RouterLink} to={'/'} sx={{ display: 'flex', margin: '0 .25em' }}>
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
            </Stack>
          </Stack>
        )}
      </Stack>

      <CommentsSection articleId={id as string} />

      <Popover
        id={open ? id : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <MenuList onKeyDown={() => {}} autoFocusItem={open}>
          <MenuItem
            onClick={() => {
              handleClose();
              setEditMode(true);
            }}>
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              setDeleteMode(true);
            }}>
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <ArticleDeleteModal open={deleteMode} id={id as string} handleClose={handleCloseDeleteMode} />
    </>
  );
};

export default ArticlePost;
