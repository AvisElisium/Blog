import {Box, Modal} from "@mui/material";
import {FC, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import UploadImageWidget from "../shared/UploadImageWidget";

interface Props {
    open: boolean;
    handleClose: () => void;
}

const UpdateProfilePictureModal: FC<Props> = ({open, handleClose}) => {
    
    const {mutateAsync} = useMutation({
        mutationFn: (file: Blob) => {
            
            const formData = new FormData();
            formData.append("file", file);
            
            return axios.post("/account/profilePicture", formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
        }
    });
    
    const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
        await mutateAsync(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, maxFiles: 1})
    
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
                <UploadImageWidget onDrop={onDrop} />
            </Box>
        </Modal>
    )
}

export default UpdateProfilePictureModal;