﻿import { useContext, useState } from 'react';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';
import { Comment } from '../components/article/comments/CommentsSection';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '../stores/authStore';

const useComments = (articleId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const currentUser = useAuthStore((state) => state.currentUser);

  const [connection, setConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_COMMENTS_URL + `?articleId=${articleId}`, {
        accessTokenFactory(): string | Promise<string> {
          return currentUser?.jwtToken ?? '';
        },
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()
  );

  async function start(connection: HubConnection) {
    try {
      connection.on('LoadComments', (_comments: Comment[]) => {
        setComments(_comments);
      });

      connection.on('ReceiveComment', (_comment: Comment) => {
        setComments((prevComments) => {
          if (prevComments[0]?.id !== _comment?.id) {
            return [_comment, ...prevComments];
          } else {
            return prevComments;
          }
        });
      });

      connection.on('DeletedComment', (_commentId) => {
        setComments((prevComments) => prevComments.filter((c) => c.id !== _commentId));
      });

      connection.on('Error', (error: { message: string }) => {
        enqueueSnackbar(error.message, {
          variant: 'error',
          preventDuplicate: true
        });
      });

      await connection.start();
    } catch (e) {
      console.log(e);
    }
  }

  return {
    comments,
    start,
    connection,
    stop: connection.stop
  };
};

export default useComments;
