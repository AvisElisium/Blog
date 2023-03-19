import {Stack, TextField} from "@mui/material";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ValidationErrorResponse} from "../../types/errors/validationErrorResponse";
import LoadingButton from "../shared/LoadingButton";
import {useNavigate} from "react-router-dom";



const RegisterUserSchema = z.object({
    username: z.string().nonempty({message: "Username is required"}),
    email: z.string().nonempty({message: "Email is required"}).email({message: "Provide valid email address"}),
    password: z.string().nonempty({message: "Password is Required"}),
    confirmPassword: z.string().nonempty({message: "Password confirmation is Required"}),
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;

const RegisterForm = () => {

    const {control, handleSubmit, formState: {errors, isValid, isDirty, isSubmitting}, setError} = useForm<RegisterUserSchema>({
        mode: "onChange",
        resolver: zodResolver(RegisterUserSchema),
        delayError: 750,
    });
    
    const onSubmit = async (data: RegisterUserSchema) => {
        await mutation.mutateAsync(data);
    };
    
    const navigate = useNavigate();
    
    const mutation = useMutation((data: RegisterUserSchema) => {
        return axios.post("/account/register", data);
    }, {
        mutationKey: "register",
        
        onSuccess: () => {
            navigate("/login")
        },

        onError: async (error: AxiosError<ValidationErrorResponse<Omit<RegisterUserSchema, "confirmPassword">>>) => {
            console.log(error.response);
            const validationErrors = error.response!.data.validationErrors;
            
            for (const [key, value] of Object.entries(validationErrors)) {
                const fieldKey = key.toLowerCase() as keyof RegisterUserSchema;
                value.forEach((err) => {
                    setError(fieldKey, {
                        type: "custom",
                        message: err,
                    })
                })
            }
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    name={"email"}
                    defaultValue={""}
                    control={control}
                    render={({field}) =>
                        <TextField {...field} label={"email"}
                                   error={!!errors.email} helperText={errors.email?.message}
                                   variant={"standard"} />
                    }
                />
                <Controller
                    name={"password"}
                    defaultValue={""}
                    control={control}
                    render={({field}) =>
                        <TextField {...field} label={"Password"}
                                   error={!!errors.password} helperText={errors.password?.message}
                                   variant={"standard"} type={"password"} />
                    }
                />
                <Controller
                    name={"confirmPassword"}
                    defaultValue={""}
                    control={control}
                    render={({field}) =>
                        <TextField {...field} label={"Confirm Password"}
                                   error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
                                   variant={"standard"} type={"password"} />
                    }
                />
                <LoadingButton text={"Register"} isLoading={isSubmitting} disabled={!isValid && isDirty} type={"submit"} variant={"outlined"} />
            </Stack>
        </form>
    )
}

export default RegisterForm;