import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Checkbox, Container, FormControlLabel, Stack, TextField} from "@mui/material";
import React from "react";
import LoadingButton from "../shared/LoadingButton";
import {useMutation} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useSnackbar} from "notistack";
import useValidationErrors from "../../hooks/UseValidationErrors";
import {ValidationErrorResponse} from "../../types/errors/validationErrorResponse";

const createTagSchema = z.object({
    name: z.string(),
    isFeatured: z.boolean(),
})

type CreateTagSchema = z.infer<typeof createTagSchema>;

const CreateTagForm = () => {

    const {control,
        handleSubmit,
        getValues,
        formState: {errors, isDirty, isValid},
        setValue,
        setError, reset} = useForm<CreateTagSchema>({
        mode: "onSubmit",
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            isFeatured: false,
            name: ""
        }
    });
    
    const setValidationErrors = useValidationErrors<CreateTagSchema>(setError);
    
    const {enqueueSnackbar} = useSnackbar();
    
    const {mutateAsync} = useMutation({
        mutationFn: (data: CreateTagSchema) => {
            return axios.post<string>("/tag", data);
        },
        
        onSuccess: (data: AxiosResponse<string, any>) => {
            enqueueSnackbar(`Tag created successfully`, {
                variant: "success",
                preventDuplicate: true,
            })
            
            reset();
        },
        
        onError: (error: AxiosError<ValidationErrorResponse<CreateTagSchema>>) => {
            setValidationErrors(error.response!.data);
        }
    })
    
    const onSubmit = async (data: any) => {
        await mutateAsync(data);
    }
    
    
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <Controller
                        name={"name"}
                        defaultValue={""}
                        control={control}
                        render={({field}) => <TextField {...field} error={!!errors.name} helperText={errors.name?.message} label={"Name"} fullWidth />}
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

                    <Button type={"submit"} variant={"contained"} disabled={!isValid && isDirty}>
                        Create
                    </Button>
                </Stack>
            </form>
        </Container>
    )
}


export default CreateTagForm;