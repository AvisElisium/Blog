import { Button, ButtonGroup, Modal, Paper, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

interface Props {
  open: boolean;
  id: string;
  handleClose: () => void;
}
const ArticleDeleteModal: FC<Props> = ({ open, id, handleClose }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ['article', id],
    mutationFn: () => axios.delete<string>(`/article/${id}`),

    onSuccess: async (response: AxiosResponse<string>) => {
      enqueueSnackbar(`Deleted article ${response.data}`, {
        variant: 'success',
        preventDuplicate: true
      });

      navigate('/');
    }
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          padding: '2em 1em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
        <Typography component={'header'}>
          Are you sure that you want to delete Article {id}
        </Typography>

        <ButtonGroup sx={{ marginTop: '2em' }}>
          <LoadingButton
            loading={isLoading}
            onClick={() => mutateAsync()}
            variant={'contained'}
            color={'error'}
          >
            Delete
          </LoadingButton>
          <Button variant={'outlined'} onClick={handleClose} color={'secondary'}>
            Cancel
          </Button>
        </ButtonGroup>
      </Paper>
    </Modal>
  );
};

export default ArticleDeleteModal;
