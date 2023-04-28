import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { Interweave } from 'interweave';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import { HubConnection } from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

interface Props {
  id: string;
  authorUsername: string;
  articleId: string;
  content: string;
  createdAt: string;
  profilePicture: string | null;
  connection?: HubConnection;
}

const CommentItem: FC<Props> = ({
  id: commentId,
  content,
  authorUsername,
  createdAt,
  articleId,
  profilePicture,
  connection
}) => {
  const handleDate = () => {
    const now = moment(new Date());
    const createdAtMoment = moment(createdAt).utc();

    let timeDiff = now.diff(createdAtMoment, 'hours');
    let timespanString = 'hours ago';

    if (timeDiff === 0) {
      return 'less than hour ago';
    }

    if (timeDiff > 48) {
      timeDiff = now.diff(createdAtMoment, 'days');
      timespanString = 'days ago';
    }

    if (timeDiff > 24 * 30) {
      return moment.utc(createdAt).format('DD MMMM YYYY');
    }

    return `${timeDiff} ${timespanString}`;
  };

  const handleDelete = async () => {
    if (connection) {
      await connection.invoke('DeleteComment', {
        commentId: commentId,
        articleId: id
      });
    }
  };

  const currentUser = useAuthStore((state) => state.currentUser);

  const { id } = useParams();

  return (
    <Paper sx={{ margin: '2em 0', padding: '.5em .25em' }}>
      <Paper elevation={0}>
        <Grid container xs={12}>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Avatar src={profilePicture || ''} />
          </Grid>

          <Grid item xs={11}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <Stack>
                <Typography>{authorUsername}</Typography>

                <Typography>{handleDate()}</Typography>
              </Stack>

              {currentUser?.username === authorUsername && (
                <Button onClick={handleDelete}>Delete</Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={1}></Grid>

          <Grid item xs={11}>
            <Typography>
              <Interweave content={content} />
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default CommentItem;
