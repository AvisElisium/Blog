import { Box, Modal, Typography } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { ImageUploadResult } from './TextEditorToolBar';
import { Editor } from '@tiptap/react';
import UploadImageWidget from './UploadImageWidget';
import useTextEditorStore from '../../stores/textEditorStore';

interface Props {
  open: boolean;
  handleClose: () => void;
  editor: Editor;
}

const TextEditorUploadImageModal: FC<Props> = ({ open, handleClose, editor }) => {
  const { mutateAsync } = useMutation({
    mutationFn: (file: Blob) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', 'test');

      return axios
        .post<ImageUploadResult>(`/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => res.data);
    },

    onSuccess: () => {
      handleClose();
    }
  });

  const addImage = useTextEditorStore((state) => state.addImage);

  const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
    const data = await mutateAsync(acceptedFiles[0]);

    if (data) {
      addImage(data);

      return editor
        .chain()
        .focus()
        .setImage({ src: data.uri, alt: data.alt, title: data.id })
        .run();
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          width: '40%',
          p: '1em .5em',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <UploadImageWidget onDrop={onDrop} />
      </Box>
    </Modal>
  );
};

export default TextEditorUploadImageModal;
