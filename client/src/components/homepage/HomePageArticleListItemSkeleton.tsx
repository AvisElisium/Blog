import { Skeleton, Stack, useTheme } from '@mui/material';


const HomePageArticleListItemSkeleton = () => {
  const theme = useTheme();
  return (
    <Stack spacing={-5} sx={{padding: theme.spacing(1)}}>
      <Skeleton width={368} height={40} />
      <Skeleton width={368} height={194} />
      <Skeleton width={368} height={152} />
    </Stack>
  )
}


export default HomePageArticleListItemSkeleton;