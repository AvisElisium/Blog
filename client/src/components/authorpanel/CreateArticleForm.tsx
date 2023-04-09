import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Container, Stack, TextField, Typography} from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import LoadingButton from "../shared/LoadingButton";
import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useSnackbar} from "notistack";
import useValidationErrors from "../../hooks/UseValidationErrors";
import {ValidationErrorResponse} from "../../types/errors/validationErrorResponse";
import React, {useRef, useState} from "react";
import {Editor, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextEditor, {TipTapMethods} from "../shared/TextEditor";
import "./styles.css";


const createArticleSchema = z.object({
    headline: z.string(),
    content: z.string(),
})

type CreateArticleSchema = z.infer<typeof createArticleSchema>;

const CreateArticleForm = () => {
    const {control,
        handleSubmit, 
        formState: {errors, isDirty, isValid},
        setValue,
        setError, reset} = useForm<CreateArticleSchema>({
        mode: "onSubmit",
        resolver: zodResolver(createArticleSchema),
    });
    
    const editorRef = useRef<TipTapMethods>();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                }
            }),
        ],
        content: '<p>Article Content</p>',
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const setValidationErrors = useValidationErrors<CreateArticleSchema>(setError);

    const {enqueueSnackbar} = useSnackbar();

    const mutation = useMutation((data: CreateArticleSchema) => {
        return axios.post<string>("/article", data);
    }, {
        mutationKey: "articles",

        onMutate: () => setIsSubmitting(true),

        onSuccess: async (response: AxiosResponse<string>) => {
            reset();
            editorRef.current?.clearContent();
            
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

    const onSubmit = async (data: any) => {
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

                    <LoadingButton type={"submit"} variant={"contained"} text={"Create"} isLoading={isSubmitting} disabled={!isValid && isDirty} />
                </Stack>
            </form>

        </Container>
    )
}


export default CreateArticleForm;