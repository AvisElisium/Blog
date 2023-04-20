import { Alert, Box, Link, Stack, TextField, Typography, useTheme } from '@mui/material';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../../types/errors/errorResponse';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

export interface User {
  username: string;
  jwtToken: string;
  isAdmin: boolean;
  isAuthor: boolean;
  profilePicture: string | null;
}

const loginUserSchema = z.object({
  username: z.string().nonempty({ message: "Username can't be empty" }),
  password: z.string().nonempty({ message: "Password can't be empty" })
});

type LoginUserSchema = z.infer<typeof loginUserSchema>;

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError
  } = useForm<LoginUserSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginUserSchema)
  });

  const { login } = useContext(AuthContext);

  const { state } = useLocation();

  const navigate = useNavigate();

  const mutation = useMutation(
    (data: LoginUserSchema) => {
      return axios.post<User>('/account/login', data, { withCredentials: true });
    },
    {
      mutationKey: 'login',

      onMutate: () => setIsSubmitting(true),

      onSuccess: (response: AxiosResponse<User>) => {
        login(response.data);
        navigate(state.from ?? '/');
      },

      onError: (error: AxiosError<ErrorResponse>) => {
        setError('root', {
          message: error.response!.data.message,
          type: 'custom'
        });
      },

      onSettled: () => setIsSubmitting(false)
    }
  );

  useEffect(() => {
    console.log(state);
  }, []);

  const onSubmit = async (data: any) => {
    await mutation.mutateAsync(data);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '8em 4em'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography fontSize={26} fontFamily={'sans-serif'}>
            <strong>Log In</strong>
          </Typography>

          <Controller
            name={'username'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Username'}
                error={!!errors.username || !!errors.root}
                helperText={errors.username?.message || errors.root?.message}
                variant={'standard'}
              />
            )}
          />
          <Controller
            name={'password'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Password'}
                type={'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant={'standard'}
              />
            )}
          />

          <Link component={RouterLink} to={'/register'}>
            <Typography>Don't have an Account? Register now.</Typography>
          </Link>

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid && isDirty}
            type={'submit'}
            variant={'contained'}
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
