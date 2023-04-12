import {Box, Typography} from "@mui/material";
import {useDropzone} from "react-dropzone";
import {FC, useCallback} from "react";
import {ImageUploadResult} from "./TextEditorToolBar";


interface Props {
    onDrop: (files: Blob[]) => void;
}

const UploadImageWidget: FC<Props> = ({ onDrop }) => {
    
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <Box sx={{
            ":hover": {
                cursor: "pointer"
            }
        }}>
            <Typography>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </div>
            </Typography>
        </Box>
    )
}


export default UploadImageWidget;