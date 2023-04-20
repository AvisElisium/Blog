import { z } from 'zod';
import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextEditor, { TipTapMethods } from '../../shared/TextEditor';
import React, { FC, useEffect, useRef } from 'react';
import { HubConnection } from '@microsoft/signalr';
import { useMutation } from 'react-query';
import { ImageUploadResult } from '../../shared/TextEditorToolBar';
import axios from 'axios';
import useTextEditorStore from '../../../stores/textEditorStore';

const commentSchema = z.object({
  articleId: z.string().nonempty(),
  content: z.string().nonempty()
});

type Comment = z.infer<typeof commentSchema>;

interface Props {
  connection: HubConnection | null;
  articleId: string;
}

const CreateCommentForm: FC<Props> = ({ articleId, connection }) => {
  const editorRef = useRef<TipTapMethods>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Comment>({
    resolver: zodResolver(commentSchema),
    mode: 'onSubmit',
    defaultValues: {
      articleId,
      content: 'Write Comment'
    }
  });

  const imageDeleteMutation = useMutation((image: ImageUploadResult) =>
    axios.delete(`/image/${image.id}`)
  );

  const imagesForDelete = useTextEditorStore((state) => state.imagesForDelete);

  const onSubmit = async (data: Comment) => {
    imagesForDelete.forEach(async (image) => {
      await imageDeleteMutation.mutateAsync(image);
    });

    connection?.invoke('CreateComment', data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          render={({ field }) => (
            // TODO remove ts-ignore
            // @ts-ignore
            <TextEditor
              {...field}
              ref={editorRef}
              description={field.value}
              onChange={field.onChange}
            />
          )}
          name={'content'}
        />
        <Button type={'submit'} variant={'contained'}>
          Submit Comment
        </Button>
      </form>
    </Box>
  );
};

export default CreateCommentForm;
