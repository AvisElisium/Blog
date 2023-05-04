import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import useValidationErrors from '../../hooks/UseValidationErrors';
import { ValidationErrorResponse } from '../../types/errors/validationErrorResponse';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import TextEditor, { TipTapMethods } from '../shared/TextEditor';
import './styles.css';
import { ImageUploadResult } from '../shared/TextEditorToolBar';
import useTextEditorStore from '../../stores/textEditorStore';
import UploadImageWidget from '../shared/UploadImageWidget';
import { Crop } from 'react-image-crop';
import useUploadImageStore from '../../stores/uploadImageStore';
import { LoadingButton } from '@mui/lab';


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 500000;

export const createArticleSchema = z.object({
  headline: z.string(),
  content: z.string(),
  isFeatured: z.boolean(),
  tagIds: z.array(z.string()),
  file: z
    .any()
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

export interface Tag {
  id: string;
  name: string;
  isFeatured: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CreateArticleForm = () => {
  const uploadedImage = useUploadImageStore((state) => state.uploadedImage);
  const setUploadedImage = useUploadImageStore((state) => state.setImage);
  const cropper = useUploadImageStore((state) => state.cropper);

  const onCrop = () => {
    console.log(cropper);
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        setUploadedImage(blob);
      });
    }
  };

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

  const handleChange = (event: SelectChangeEvent<Tag>) => {
    const value = event.target.value;
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
    setValue,
    setError,
    reset
  } = useForm<CreateArticleSchema>({
    mode: 'onBlur',
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      isFeatured: false,
      tagIds: []
    }
  });

  const editorRef = useRef<TipTapMethods>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValidationErrors = useValidationErrors<CreateArticleSchema>(setError);

  const { enqueueSnackbar } = useSnackbar();

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

      return axios.post<string>('/article', formData);
    },
    {
      mutationKey: 'articles',

      onMutate: () => setIsSubmitting(true),

      onSuccess: async (response: AxiosResponse<string>) => {
        reset();
        editorRef.current?.clearContent();
        setUploadedImage(null);

        enqueueSnackbar(`Created article ${response.data}`, {
          variant: 'success',
          preventDuplicate: true
        });
      },

      onError: (error: AxiosError<ValidationErrorResponse<CreateArticleSchema>>) => {
        setValidationErrors(error.response!.data);
        
        if (error.response!.data.validationErrors["file"]) {
          
        }
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
    setValue("file", uploadedImage);
  }, []);

  return (
    <Container
      sx={{
        marginTop: 4,
        marginBottom: 4
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography>Upload Article image</Typography>
          <UploadImageWidget onDrop={onDrop} />
          {errors.file && <Alert severity={"error"}>{errors.file?.message?.toString()}</Alert>}

          <Button variant={'contained'} onClick={onCrop}>
            Crop
          </Button>

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
                // todo remove ts-ignore
                // @ts-ignore
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
            render={({ ...props }) => (
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
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
              />
            )}
          />

          <LoadingButton
            loading={mutation.isLoading}
            variant={'contained'}
            disabled={!isValid}
            type={'submit'}>
            Create
          </LoadingButton>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateArticleForm;
