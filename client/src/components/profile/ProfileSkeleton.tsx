import { Box, Skeleton, Stack } from '@mui/material';


const ProfileSkeleton = () => {
  return (
    <Stack spacing={4}>
      <Skeleton variant={"rectangular"} height={200} animation={"wave"} />

      <Skeleton variant={"rectangular"} height={100} animation={"wave"} />
      <Skeleton variant={"rectangular"} height={100} animation={"wave"} />
      <Skeleton variant={"rectangular"} height={100} animation={"wave"} />
    </Stack>
  )
}


export default ProfileSkeleton;