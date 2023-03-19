﻿import {Alert, Stack, TextField} from "@mui/material";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "react-query";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ErrorResponse} from "../../types/errors/errorResponse";
import LoadingButton from "../shared/LoadingButton";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export interface User {
    username: string,
    jwtToken: string,
}

const loginUserSchema = z.object({
    username: z.string().nonempty({message: "Username can't be empty"}),
    password: z.string().nonempty({message: "Password can't be empty"}),
})

type LoginUserSchema = z.infer<typeof loginUserSchema>;

const LoginForm = () => {
    
    const {control, handleSubmit, formState: {errors, isDirty, isValid, isSubmitting}, setError} = useForm<LoginUserSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginUserSchema),
    });

    const {login} = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    const mutation = useMutation((data:  LoginUserSchema) => {
        return axios.post<User>("/account/login", data);
    }, {
        mutationKey: "login",

        onSuccess: (response: AxiosResponse<User>) => {
            login(response.data);
            navigate("/");
        },

        onError: (error: AxiosError<ErrorResponse>) => {
            setError("root", {
                message: error.response!.data.message,
                type: "custom",
            })
        }
    });

    const onSubmit = async (data: any) => {
        await mutation.mutateAsync(data);
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && <Alert severity={"error"}>{errors.root.message}</Alert> }
            <Stack spacing={3}>
                <Controller
                    name={"username"}
                    defaultValue={""}
                    control={control}
                    render={({field}) =>
                        <TextField {...field} label={"Username"} error={!!errors.username} helperText={errors.username?.message} variant={"standard"}/>
                    }
                />
                <Controller
                    name={"password"}
                    defaultValue={""}
                    control={control}
                    render={({field}) =>
                        <TextField {...field} label={"Password"} type={"password"} error={!!errors.password} helperText={errors.password?.message} variant={"standard"}/>
                    }
                />
                
                <LoadingButton text={"Login"} isLoading={isSubmitting} disabled={!isValid && isDirty} type={"submit"} variant={"outlined"} />
            </Stack>
        </form>
    )
}

export default LoginForm;