import {Box, Button, Modal, Typography} from "@mui/material";
import {FC, useCallback, useContext, useState} from "react";
import {useDropzone} from "react-dropzone";
import {useMutation, useQuery, useQueryClient} from "react-query";
import axios from "axios";
import UploadImageWidget from "../shared/UploadImageWidget";
import {AuthContext} from "../../context/AuthContext";
import useUploadImageStore from "../../stores/uploadImageStore";

interface Props {
    open: boolean;
    handleClose: () => void;
}

const UpdateProfilePictureModal: FC<Props> = ({open, handleClose}) => {
    
    const {currentUser} = useContext(AuthContext);
    const client = useQueryClient();
    const setImage = useUploadImageStore((state) => state.setImage);
    const image = useUploadImageStore((state) => state.uploadedImage);
    const cropper = useUploadImageStore((state) => state.cropper);
    
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
        setImage(acceptedFiles[0]);
    }, [])
    
    const onUpload = async () => {
        if (image) {
            await mutateAsync(image);
            await client.invalidateQueries(["profile", currentUser?.username]);
            await client.invalidateQueries("refresh");
            handleClose();
        }
    }
    
    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                setImage(blob);
            })
        }
    }
    
    
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
                
                <Button variant={"contained"} onClick={onCrop}>Crop</Button>
                
                <Box>
                    <Button onClick={onUpload}>Upload</Button>
                </Box>
                
            </Box>
        </Modal>
    )
}

export default UpdateProfilePictureModal;