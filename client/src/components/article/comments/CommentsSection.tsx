import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../../auth/LoginForm';
import CreateCommentForm from './CreateCommentForm';
import CommentItem from './CommentItem';
import useComments from '../../../hooks/useComments';
import { Box, Stack, Typography } from '@mui/material';
import CommentList from './CommentList';
import { useAuthStore } from '../../../stores/authStore';

interface Props {
  articleId: string;
}

export interface Comment {
  id: string;
  authorUsername: string;
  content: string;
  createdAt: string;
  articleId: string;
  authorProfilePicture: string | null;
}

const CommentsSection: FC<Props> = ({ articleId }) => {
  const { start, stop, connection, comments } = useComments(articleId);

  const currentUser = useAuthStore((state) => state.currentUser);

  const token = currentUser?.jwtToken;

  useEffect(() => {
    start(connection);
  }, [articleId]);

  return (
    <Box sx={{ marginBottom: '2em' }}>
      <Stack>
        <Typography variant={'h4'}>Create Comment</Typography>
        <CreateCommentForm connection={connection} articleId={articleId} />
      </Stack>

      <CommentList comments={comments} connection={connection} />
    </Box>
  );
};

export default CommentsSection;
