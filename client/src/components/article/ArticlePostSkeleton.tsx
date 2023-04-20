import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const ArticlePostSkeleton = () => {
  return (
    <Stack
      spacing={5}
      sx={{
        marginTop: '2em'
      }}
    >
      <Skeleton variant={'rectangular'} animation={'wave'} height={40} width={'20%'} />

      <Stack spacing={2}>
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
      </Stack>

      <Stack spacing={2}>
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
      </Stack>

      <Stack spacing={2}>
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
        <Skeleton variant={'rectangular'} height={20} width={'100%'} />
      </Stack>
    </Stack>
  );
};

export default ArticlePostSkeleton;
