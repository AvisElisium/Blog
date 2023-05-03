import { Box, Stack, TextField, Typography } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useValidationErrors from '../../hooks/UseValidationErrors';
import { useMutation } from 'react-query';
import axios, { AxiosError } from "axios";
import { ValidationErrorResponse } from '../../types/errors/validationErrorResponse';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';


const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8).nonempty({ message: 'current password is Required' }),
  newPassword: z.string().min(8).nonempty({ message: 'New password is Required' }),
  confirmNewPassword: z.string().nonempty({ message: 'New password confirmation is Required' })
}).refine((data) => data.confirmNewPassword === data.newPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
});

type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

const ChangePasswordForm = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const [initialRender, setInitialRender] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser === null && !initialRender) {
      navigate("/login", {replace: true});
    }
    
    setInitialRender(false);
  }, [currentUser])
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError
  } = useForm<ChangePasswordSchema>({
    mode: 'onChange',
    resolver: zodResolver(ChangePasswordSchema),
    delayError: 750
  });

  const setValidationErrors = useValidationErrors<ChangePasswordSchema>(setError);

  const {mutateAsync, isLoading} = useMutation(
    (data: ChangePasswordSchema) => {
      return axios.post('/account/changePassword', data);
    },
    {
      onSuccess: () => {
        logout();
        navigate('/login');
      },
      onError: (
        error: AxiosError<ValidationErrorResponse<Omit<ChangePasswordSchema, 'confirmNewPassword'>>>
      ) => {
        setValidationErrors(error.response!.data);
      },
    }
  );

  const onSubmit = async (data: ChangePasswordSchema) => {
    await mutateAsync(data);
  };
  
  return (
    <Box
      sx={{
        padding: '8em 4em'
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography>
            Change Password
          </Typography>

          <Controller
            name={'currentPassword'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Current Password'}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                variant={'standard'}
                type={'password'}
              />
            )}
          />

          <Controller
            name={'newPassword'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'New Password'}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                variant={'standard'}
                type={'password'}
              />
            )}
          />

          <Controller
            name={'confirmNewPassword'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={'Confirm New Password'}
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword?.message}
                variant={'standard'}
                type={'password'}
              />
            )}
          />

          <LoadingButton
            loading={isLoading}
            disabled={!isValid && isDirty}
            type={'submit'}
            variant={'contained'}>
            Change Password
          </LoadingButton>
        </Stack>
      </form>
    </Box>)
};


export default ChangePasswordForm;