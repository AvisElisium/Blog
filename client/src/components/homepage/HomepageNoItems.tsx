import { Alert, Box, Grid, Typography } from '@mui/material';

const HomepageNoItems = () => {
  return (
    <Grid item xs={12} display={'flex'} alignContent={'center'}>
      <Alert severity={'info'}>
        <Typography fontWeight={'bold'} fontSize={24}>
          No Articles were found, try later
        </Typography>
      </Alert>
    </Grid>
  );
};

export default HomepageNoItems;
