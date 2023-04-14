import {Box, Typography} from "@mui/material";
import {useDropzone} from "react-dropzone";
import {FC, useCallback, useEffect, useState} from "react";


interface Props {
    onDrop: (files: Blob[]) => void;
}

const UploadImageWidget: FC<Props> = ({ onDrop }) => {
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})
    
    return (
        <Box sx={{
            ":hover": {
                cursor: "pointer"
            }
        }}>
            <Typography>
                <Box {...getRootProps()} sx={{
                    border: "2px blue dashed",
                    padding: "2em 0",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <input {...getInputProps()} />

                    {acceptedFiles.length == 0 &&
                        <Typography>
                            Click or drop file here to upload
                        </Typography>
                    }

                    {acceptedFiles.length > 0 &&
                        <Typography>
                            {acceptedFiles[0].name} Uploaded
                        </Typography>
                    }
                    
                </Box>
            </Typography>
        </Box>
    )
}


export default UploadImageWidget;