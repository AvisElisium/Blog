import { Controller, useForm } from 'react-hook-form';
import { createArticleSchema, CreateArticleSchema, Tag } from '../authorpanel/CreateArticleForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import TextEditor, { TipTapMethods } from '../shared/TextEditor';
import useValidationErrors from '../../hooks/UseValidationErrors';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ValidationErrorResponse } from '../../types/errors/validationErrorResponse';
import { useParams } from 'react-router-dom';
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import LoadingButton from '../shared/LoadingButton';
import useTextEditorStore from '../../stores/textEditorStore';
import { ImageUploadResult } from '../shared/TextEditorToolBar';
import UploadImageWidget from '../shared/UploadImageWidget';
import useUploadImageStore from '../../stores/uploadImageStore';

interface Props {
  initialHeadline: string;
  initialContent: string;
  initialTags: Tag[];
  id: string;
  initialIsFeatured: boolean;
  closeEditMode: () => void;
}

const ArticleEditForm: FC<Props> = ({
  initialHeadline,
  initialContent,
  initialTags,
  initialIsFeatured,
  id,
  closeEditMode
}) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const tagsQuery = useQuery({
    queryKey: 'tags',
    queryFn: () => {
      return axios.get<Tag[]>('/tag').then((res) => res.data);
    },

    onSuccess: (data: Tag[]) => {
      setTags(data);
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    getValues,
    setError,
    reset
  } = useForm<CreateArticleSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      headline: initialHeadline,
      content: initialContent,
      isFeatured: initialIsFeatured,
      tagIds: initialTags.map((tag) => tag.id)
    }
  });

  const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
  const setUploadedImage = useUploadImageStore((state) => state.setImage);
  const cropper = useUploadImageStore((state) => state.cropper);

  const editorRef = useRef<TipTapMethods>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setValidationErrors = useValidationErrors<CreateArticleSchema>(setError);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: CreateArticleSchema) => {
      const formData = new FormData();
      const values = getValues();

      for (const [k, v] of Object.entries(values)) {
        if (Array.isArray(v)) {
          v.forEach((tagId, i) => {
            // https://stackoverflow.com/questions/63837952/is-there-a-way-to-add-array-elements-to-a-formdata-object-so-net-core-fromform
            formData.append(`TagIds[${i}]`, tagId);
          });
        } else {
          formData.append(k, v as string);
        }
      }

      if (uploadedImage !== null) {
        formData.append('file', uploadedImage);
      }

      return axios.put<string>(`/article/${id}`, formData);
    },
    {
      mutationKey: ['article', id],

      onMutate: () => setIsSubmitting(true),

      onSuccess: async (response: AxiosResponse<string>) => {
        reset();
        editorRef.current?.clearContent();
        closeEditMode();
        await queryClient.invalidateQueries(['article', id]);

        enqueueSnackbar(`Edited article ${response.data}`, {
          variant: 'success',
          preventDuplicate: true
        });
      },

      onError: (error: AxiosError<ValidationErrorResponse<CreateArticleSchema>>) => {
        setValidationErrors(error.response!.data);
      },

      onSettled: () => setIsSubmitting(true)
    }
  );

  const imageDeleteMutation = useMutation((image: ImageUploadResult) =>
    axios.delete(`/image/${image.id}`)
  );

  const imagesForDelete = useTextEditorStore((state) => state.imagesForDelete);

  const onSubmit = async (data: any) => {
    imagesForDelete.forEach(async (image) => {
      await imageDeleteMutation.mutateAsync(image);
    });

    await mutation.mutateAsync(data);
  };

  const onDrop = useCallback(async (acceptedFiles: Blob[]) => {
    setUploadedImage(acceptedFiles[0]);
  }, []);

  const onCrop = () => {
    console.log(cropper);
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setUploadedImage(blob);
      });
    }
  };

  return (
    <Container
      sx={{
        marginTop: 4
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography>Upload Article image</Typography>
        <UploadImageWidget onDrop={onDrop} />

        <Button variant={'contained'} onClick={onCrop}>
          Crop
        </Button>

        <Stack spacing={2}>
          <Controller
            name={'headline'}
            defaultValue={''}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.headline}
                helperText={errors.headline?.message}
                label={'Headline'}
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name={'content'}
            defaultValue={''}
            // todo remove ts-ignore
            // @ts-ignore
            render={({ field }) => (
              <TextEditor
                {...field}
                ref={editorRef}
                description={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={'isFeatured'}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={getValues('isFeatured')}
                    onChange={(e) => {
                      setValue('isFeatured', e.currentTarget.checked);
                    }}
                  />
                }
                label="Featured"
              />
            )}
          />

          <Controller
            control={control}
            name={'tagIds'}
            render={({ field: { onChange, value }, ...props }) => (
              <Autocomplete
                {...props}
                multiple
                id="tags-outlined"
                onChange={(e, values) =>
                  setValue(
                    'tagIds',
                    values.map((tag) => tag.id)
                  )
                }
                options={tags}
                getOptionLabel={(option) => option.name}
                defaultValue={initialTags}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Tags" onChange={onChange} />
                )}
              />
            )}
          />

          <LoadingButton
            type={'submit'}
            variant={'contained'}
            text={'Create'}
            isLoading={isSubmitting}
            disabled={!isValid && isDirty}
          />
        </Stack>
      </form>
    </Container>
  );
};

export default ArticleEditForm;
