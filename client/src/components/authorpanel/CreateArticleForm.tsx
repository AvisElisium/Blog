import {useForm, Controller} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Container, Stack, TextField, Typography} from "@mui/material";
import 'react-quill/dist/quill.snow.css';
import LoadingButton from "../shared/LoadingButton";
import {useMutation, useQueryClient} from "react-query";
import axios, {AxiosResponse} from "axios";
import {useSnackbar} from "notistack";


const createArticleSchema = z.object({
    headline: z.string(),
    content: z.string(),
})

type CreateArticleSchema = z.infer<typeof createArticleSchema>;

const CreateArticleForm = () => {
    const {control, handleSubmit, formState: {errors, isSubmitting, isDirty}, setError} = useForm<CreateArticleSchema>({
        mode: "onSubmit",
        resolver: zodResolver(createArticleSchema),
    });
    
    const queryClient = useQueryClient();
    const {enqueueSnackbar} = useSnackbar();
    
    const mutation = useMutation((data: CreateArticleSchema) => {
        return axios.post<string>("/article", data);
    }, {
        mutationKey: "articles",
        
        onSuccess: async (response: AxiosResponse<string>) => {
            enqueueSnackbar(`Created article ${response.data}`, {
                variant: "success",
                preventDuplicate: true,
            })
        },
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
                        name={"content"}
                        defaultValue={""}
                        control={control}
                        render={({field}) => <TextField multiline error={!!errors.headline} helperText={errors.content?.message} rows={12} {...field} label={"Content"} fullWidth />}
                    />
                    <LoadingButton type={"submit"} variant={"contained"} text={"Create"} isLoading={isSubmitting} />
                </Stack>
            </form>
        </Container>
    )
}


export default CreateArticleForm;