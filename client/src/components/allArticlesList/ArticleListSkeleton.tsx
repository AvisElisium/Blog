import { Masonry } from '@mui/lab';
import { Grid, Skeleton, Stack } from '@mui/material';

const ArticleListSkeleton = () => {
  return (
    <Grid xs={12} container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant={"rectangular"} width={370} height={480} animation={"wave"} />
      </Grid>
    </Grid>
  );
};

export default ArticleListSkeleton;