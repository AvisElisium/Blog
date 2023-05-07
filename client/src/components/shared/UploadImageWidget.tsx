import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'cropperjs/dist/cropper.css';
import { Cropper, ReactCropperElement } from 'react-cropper';
import useUploadImageStore from '../../stores/uploadImageStore';

interface Props {
  onDrop: (files: Blob[]) => void;
  progress?: null | number;
}

const UploadImageWidget: FC<Props> = ({ onDrop, progress }) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });
  const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
  const setCropper = useUploadImageStore((state) => state.setCropper);
  const setImage = useUploadImageStore((state) => state.setImage);

  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);

  return (
    <Box
      sx={{
        ':hover': {
          cursor: 'pointer'
        }
      }}
    >
      <Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: '2px blue dashed',
            padding: '2em 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <input {...getInputProps()} />

          {uploadedImage !== null && acceptedFiles.length > 0 ? (
            <Typography>{acceptedFiles[0].name} Uploaded</Typography>
          ) : (
            <Typography>
              Click or drop file here to upload
              {progress && <LinearProgress value={progress}  />}
            </Typography>
          )}
        </Box>
        
        <Box>
          {uploadedImage !== null && acceptedFiles.length > 0 && (
            <Grid
              container
              xs={12}
              sx={{
                maxHeight: 400
              }}
            >
              <Grid item xs={6}>
                <Typography>Crop</Typography>
                <Cropper
                  src={URL.createObjectURL(acceptedFiles[0])}
                  style={{ height: 400 }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  preview={'.img-preview'}
                  guides={false}
                  viewMode={1}
                  autoCropArea={1}
                  background={false}
                  onInitialized={(cropper) => setCropper(cropper)}
                />
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography>Preview</Typography>
                  <img
                    style={{
                      maxWidth: '100%',
                      maxHeight: 400
                    }}
                    alt={'Cropped image preview'}
                    src={URL.createObjectURL(uploadedImage)}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Typography>
    </Box>
  );
};

export default UploadImageWidget;
