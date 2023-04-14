import {Controller, useForm} from "react-hook-form";
import {createArticleSchema, CreateArticleSchema} from "../authorpanel/CreateArticleForm";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {FC, useRef, useState} from "react";
import TextEditor, {TipTapMethods} from "../shared/TextEditor";
import useValidationErrors from "../../hooks/UseValidationErrors";
import {useSnackbar} from "notistack";
import {useMutation} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ValidationErrorResponse} from "../../types/errors/validationErrorResponse";
import {useParams} from "react-router-dom";
import {Checkbox, Container, FormControlLabel, Stack, TextField} from "@mui/material";
import LoadingButton from "../shared/LoadingButton";
import useTextEditorStore from "../../stores/textEditorStore";
import {ImageUploadResult} from "../shared/TextEditorToolBar";


interface Props {
    initialHeadline: string;
    initialContent: string;
    id: string;
    initialIsFeatured: boolean;
    closeEditMode: () => void;
}

const ArticleEditForm: FC<Props> = ({initialHeadline, initialContent, initialIsFeatured, id, closeEditMode}) => {

    const {control,
        handleSubmit,
        formState: {errors, isDirty, isValid},
        setValue,
        getValues,
        setError, reset} = useForm<CreateArticleSchema>({
        mode: "onSubmit",
        resolver: zodResolver(createArticleSchema),
        defaultValues: {
            headline: initialHeadline,
            content: initialContent,
            isFeatured: initialIsFeatured,
        }
    });

    const editorRef = useRef<TipTapMethods>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const setValidationErrors = useValidationErrors<CreateArticleSchema>(setError);
    const {enqueueSnackbar} = useSnackbar();

    const mutation = useMutation((data: CreateArticleSchema) => {
        return axios.put<string>(`/article/${id}`, data);
    }, {
        mutationKey: ["article", id],

        onMutate: () => setIsSubmitting(true),

        onSuccess: async (response: AxiosResponse<string>) => {
            reset();
            editorRef.current?.clearContent();
            closeEditMode()

            enqueueSnackbar(`Edited article ${response.data}`, {
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
    
    return (
        <Container sx={{
            marginTop: 4,
        }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
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
                            <FormControlLabel control={<Checkbox {...field} checked={getValues("isFeatured")} onChange={(e) => {
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

export default ArticleEditForm;