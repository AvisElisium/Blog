﻿import {Box, Modal, Typography} from "@mui/material";
import {FC, useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useMutation} from "react-query";
import axios, {AxiosResponse} from "axios";
import {ImageUploadResult} from "./TextEditorToolBar";
import {Editor} from "@tiptap/react";

interface Props {
    open: boolean
    handleClose: () => void;
    handleSetImages: (img: ImageUploadResult) => void;
    editor: Editor;
}

const TextEditorUploadImageModal: FC<Props> = ({open, handleClose, handleSetImages, editor}) => {
    
    const {mutateAsync} = useMutation({
           mutationFn: (file: Blob) => {
               const formData = new FormData();
               formData.append("file", file);
               formData.append("alt", "test");

               return axios.post<ImageUploadResult>(`/image`, formData, {
                   headers: {"Content-Type": "multipart/form-data"},
               }).then(res => res.data)
           },
        
        onSuccess: () => {
               handleClose();
        }
    })

    const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
        const data = await mutateAsync(acceptedFiles[0]);

        if (data) {

            handleSetImages(data as unknown as ImageUploadResult);

            return editor.chain().focus().setImage({src: data.uri, alt: data.alt, title: data.id}).run();
        }
        
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                width: "40%",
                p: "1em .5em",
                display: "flex",
                justifyContent: "center",
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
        </Modal>
    )
}

export default TextEditorUploadImageModal;