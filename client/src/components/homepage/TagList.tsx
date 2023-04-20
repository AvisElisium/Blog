import { Box, Chip } from '@mui/material';
import { Tag } from '../authorpanel/CreateArticleForm';
import { FC } from 'react';

interface Props {
  tags: Tag[];
}

const TagList: FC<Props> = ({ tags }) => {
  return (
    <Box>
      {tags.map((tag) => (
        <Chip key={tag.id} label={tag.name} />
      ))}
    </Box>
  );
};

export default TagList;
