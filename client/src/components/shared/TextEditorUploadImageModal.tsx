import {Box, Modal, Typography} from "@mui/material";
import {FC, useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useMutation} from "react-query";
import axios from "axios";
import {ImageUploadResult} from "./TextEditorToolBar";
import {Editor} from "@tiptap/react";

interface Props {
    open: boolean
    handleClose: () => void;
    handleSetImages: (img: ImageUploadResult) => void;
    editor: Editor;
}

const TextEditorUploadImageModal: FC<Props> = ({open, handleClose, handleSetImages, editor}) => {
    
    const [files, setFiles] = useState<Blob[]>([]);

    const {mutateAsync, data} = useMutation<ImageUploadResult>({
        mutationFn: () => {

            let formData = new FormData();
            formData.append("file", files[0]);
            formData.append("alt", "test");

            return axios.post(`/image`, formData, {
                headers: {"Content-Type": "multipart/form-data"}
            }).then(res => res.data)
        },
        
        onSuccess: () => handleClose(),
    })

    const handleFileUpload = async () => {

        const data = await mutateAsync();

        if (data) {

            handleSetImages(data);

            return editor.chain().focus().setImage({src: data.uri, alt: data.alt, title: data.id}).run();
        }
    }

    const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
        setFiles(acceptedFiles);
        await handleFileUpload();
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