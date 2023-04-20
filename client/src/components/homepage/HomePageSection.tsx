import { Box, Divider, Grid, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  name?: string;
}

const HomePageSection: FC<PropsWithChildren<Props>> = ({ children, name }) => {
  return (
    <Grid
      container
      sx={{
        marginTop: '2em'
      }}
    >
      {name && (
        <Typography
          variant={'h3'}
          variantMapping={{
            h3: 'h2'
          }}
        >
          {name}
        </Typography>
      )}
      {children}
    </Grid>
  );
};

export default HomePageSection;
