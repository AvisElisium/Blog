﻿import { Box, Link, Stack, TextField, Typography } from '@mui/material';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { ValidationErrorResponse } from '../../types/errors/validationErrorResponse';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import useValidationErrors from '../../hooks/UseValidationErrors';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAuthStore } from '../../stores/authStore';

const RegisterUserSchema = z
  .object({
    username: z.string().min(5).nonempty({ message: 'Username is required' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Provide valid email address' }),
    password: z.string().min(8).nonempty({ message: 'Password is Required' }),
    confirmPassword: z.string().nonempty({ message: 'Password confirmation is Required' })
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;

const RegisterForm = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser !== null) return <Navigate to={'/'} />;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError
  } = useForm<RegisterUserSchema>({
    mode: 'onChange',
    resolver: zodResolver(RegisterUserSchema),
    delayError: 750
  });

  const setValidationErrors = useValidationErrors<RegisterUserSchema>(setError);

  const onSubmit = async (data: RegisterUserSchema) => {
    await mutation.mutateAsync(data);
  };

  const navigate = useNavigate();

  const mutation = useMutation(
    (data: RegisterUserSchema) => {
      return axios.post('/account/register', data);
    },
    {
      mutationKey: 'register',

      onMutate: () => setIsSubmitting(true),

      onSuccess: () => {
        navigate('/login');
      },

      onError: (
        error: AxiosError<ValidationErrorResponse<Omit<RegisterUserSchema, 'confirmPassword'>>>
      ) => {
        setValidationErrors(error.response!.data);
      },

      onSettled: () => setIsSubmitting(false)
    }
  );

  return (
    <Box
      sx={{
        padding: '8em 4em'
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography fontSize={26} fontFamily={'sans-serif'}>
            <strong>Register</strong>
          </Typography>

          <Controller
            name={'username'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Username'}
                error={!!errors.username}
                helperText={errors.username?.message}
                variant={'standard'}
              />
            )}
          />
          <Controller
            name={'email'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'email'}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                error={!!errors.password}
                helperText={errors.password?.message}
                variant={'standard'}
                type={'password'}
              />
            )}
          />
          <Controller
            name={'confirmPassword'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Confirm Password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                variant={'standard'}
                type={'password'}
              />
            )}
          />

          <Link component={RouterLink} to={'/login'}>
            <Typography>Have an Account? Login now.</Typography>
          </Link>

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid && isDirty}
            type={'submit'}
            variant={'contained'}>
            Register
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
