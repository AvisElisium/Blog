import { Box, Button, ButtonGroup } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthorActions = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <ButtonGroup>
        <Button onClick={() => navigate('/authorPanel/createArticle')}>Create Article</Button>
        <Button onClick={() => navigate('/authorPanel/createTag')}>Create Tag</Button>
      </ButtonGroup>

      <Outlet />
    </Box>
  );
};

export default AuthorActions;
