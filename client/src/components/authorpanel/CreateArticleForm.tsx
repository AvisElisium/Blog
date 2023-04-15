import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import LoadingButton from "../shared/LoadingButton";
import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useSnackbar} from "notistack";
import useValidationErrors from "../../hooks/UseValidationErrors";
import {ValidationErrorResponse} from "../../types/errors/validationErrorResponse";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Editor, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextEditor, {TipTapMethods} from "../shared/TextEditor";
import "./styles.css";
import {ImageUploadResult} from "../shared/TextEditorToolBar";
import useTextEditorStore from "../../stores/textEditorStore";
import UploadImageWidget from "../shared/UploadImageWidget";
import {Crop} from "react-image-crop";
import useUploadImageStore from "../../stores/uploadImageStore";


export const createArticleSchema = z.object({
    headline: z.string(),
    content: z.string(),
    isFeatured: z.boolean(),
})

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

const CreateArticleForm = () => {
    const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
    const setUploadedImage = useUploadImageStore((state) => state.setImage);
    const cropper = useUploadImageStore((state) => state.cropper);
    

    const onCrop = () => {
        console.log(cropper);
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                setUploadedImage(blob);
            })
        }
    }
    
    
    const {control,
        handleSubmit,
        getValues,
        formState: {errors, isDirty, isValid},
        setValue,
        setError, reset} = useForm<CreateArticleSchema>({
        mode: "onSubmit",
        resolver: zodResolver(createArticleSchema),
        defaultValues: {
            isFeatured: false,
        }
    });
    
    const editorRef = useRef<TipTapMethods>();
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setValidationErrors = useValidationErrors<CreateArticleSchema>(setError);

    const {enqueueSnackbar} = useSnackbar();

    const mutation = useMutation((data: CreateArticleSchema) => {
        
        const formData = new FormData()
        const values = getValues();
        
        for (const [k, v] of Object.entries(values)) {
            formData.append(k, v as string);
        }
        
        if (uploadedImage !== null) {
            formData.append("file", uploadedImage);
        }
        
        return axios.post<string>("/article", formData);
    }, {
        mutationKey: "articles",

        onMutate: () => setIsSubmitting(true),

        onSuccess: async (response: AxiosResponse<string>) => {
            reset();
            editorRef.current?.clearContent();
            setUploadedImage(null);
            
            enqueueSnackbar(`Created article ${response.data}`, {
                variant: "success",
                preventDuplicate: true,
            })
        },

        onError: (error: AxiosError<ValidationErrorResponse<CreateArticleSchema>>) => {
            setValidationErrors(error.response!.data);
        },

        onSettled: () => setIsSubmitting(true),
    })

    const imageDeleteMutation = useMutation((image: ImageUploadResult) => axios.delete(`/image/${image.id}`));

    const imagesForDelete = useTextEditorStore((state) => state.imagesForDelete);
    
    const onSubmit = async (data: any) => {
        imagesForDelete.forEach(async (image) => {
            await imageDeleteMutation.mutateAsync(image);
        })
        
        await mutation.mutateAsync(data);
    }

    const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
        setUploadedImage(acceptedFiles[0]);
    }, [])
    
    
    return (
        <Container sx={{
            marginTop: 4,
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    
                    <Typography>
                        Upload Article image
                    </Typography>
                    <UploadImageWidget onDrop={onDrop} />
                    
                    <Button variant={"contained"} onClick={onCrop}>Crop</Button>
                    
                    <Controller
                        name={"headline"}
                        defaultValue={""}
                        control={control}
                        render={({field}) => <TextField {...field} error={!!errors.headline} helperText={errors.headline?.message} label={"Headline"} fullWidth />}
                    />
                    <Controller
                        control={control}
                        name={"content"}
                        defaultValue={""}
                        // todo remove ts-ignore
                        // @ts-ignore
                        render={({field}) => <TextEditor {...field} ref={editorRef} description={field.value} onChange={field.onChange} />}
                    />
                    
                    <Controller 
                        control={control} 
                        name={"isFeatured"} 
                        render={({field}) => (
                            <FormControlLabel control={<Checkbox {...field} onChange={(e) => {
                                setValue("isFeatured", e.currentTarget.checked);
                            }} />} label="Featured" />
                        )} 
                    
                    />
                    
                    <LoadingButton type={"submit"} variant={"contained"} text={"Create"} isLoading={isSubmitting} disabled={!isValid && isDirty} />
                </Stack>
            </form>
            
        </Container>
    )
}


export default CreateArticleForm;