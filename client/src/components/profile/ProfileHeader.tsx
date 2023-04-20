import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment/moment';
import React, { FC, useContext, useState } from 'react';
import { ProfileDto } from './Profile';
import { AuthContext } from '../../context/AuthContext';
import UpdateProfilePictureModal from './UpdateProfilePictureModal';

interface Props {
  profile: ProfileDto;
}

const ProfileHeader: FC<Props> = ({ profile }) => {
  const handleRole = (r: number) => {
    if (r === 0) return 'User';
    if (r === 1) return 'Author';
    if (r === 2) return 'Admin';
  };

  const [uploadMode, setUploadMode] = useState(false);
  const handleClose = () => {
    setUploadMode(false);
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Stack
        direction={'row'}
        sx={{
          padding: '2em 0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Stack direction={'row'}>
            {profile.username === currentUser?.username && (
              <Button onClick={() => setUploadMode(true)} variant={'contained'} size={'small'}>
                Upload Image
              </Button>
            )}

            <Avatar
              src={profile.profilePicture || ''}
              sx={{
                width: 80,
                height: 80,
                margin: '0em 1em'
              }}
            />
          </Stack>
        </Box>

        <Stack>
          <Typography>{profile.username}</Typography>

          <Typography>
            Member since: {moment(profile.joined, 'DD.MM.YYYY HH:mm:SS').format('DD MMMM YYYY')}
          </Typography>

          <Typography>Role: {handleRole(profile.userType)}</Typography>
        </Stack>
      </Stack>

      <UpdateProfilePictureModal open={uploadMode} handleClose={handleClose} />
    </>
  );
};

export default ProfileHeader;
