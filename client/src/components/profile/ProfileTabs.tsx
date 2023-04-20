import { Box, Grid, Link, Stack, Tab, Tabs, Typography } from '@mui/material';
import ProfileTabPanel, { a11yProps } from './ProfileTabPanel';
import CommentItem from '../article/comments/CommentItem';
import moment from 'moment/moment';
import { Link as RouterLink } from 'react-router-dom';
import React, { FC, SyntheticEvent, useState } from 'react';
import { ProfileDto } from './Profile';
import CommentList from '../article/comments/CommentList';

interface Props {
  profile: ProfileDto;
}

const ProfileTabs: FC<Props> = ({ profile }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid item xs={12}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation={'horizontal'}
            centered
          >
            <Tab label="Latest Comments" {...a11yProps(0)} />
            <Tab label="Latest Articles" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <ProfileTabPanel value={value} index={0}>
          <CommentList comments={profile.lastComments} />
        </ProfileTabPanel>
        <ProfileTabPanel value={value} index={1}>
          {profile.lastArticles.map((article) => {
            return (
              <Grid container xs={12}>
                <Grid item xs={4}>
                  image
                </Grid>

                <Grid item xs={6}>
                  <Stack>
                    <Typography>{article.headline}</Typography>

                    <Typography>
                      {moment(article.createdAt).utc().format('DD MMMM YYYY HH:MM')}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={2}>
                  <Link component={RouterLink} to={`/article/${article.id}`}>
                    Go to article
                  </Link>
                </Grid>
              </Grid>
            );
          })}
        </ProfileTabPanel>
      </Box>
    </Grid>
  );
};

export default ProfileTabs;
