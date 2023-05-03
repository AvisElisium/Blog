import { Box, Button, ButtonGroup } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthorActions = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      padding: 2
    }}>
      <ButtonGroup sx={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Button onClick={() => navigate('/authorPanel/createArticle')}>Create Article</Button>
        <Button onClick={() => navigate('/authorPanel/createTag')}>Create Tag</Button>
      </ButtonGroup>
    </Box>
  );
};

export default AuthorActions;
