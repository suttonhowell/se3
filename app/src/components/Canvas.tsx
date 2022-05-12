import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Canvas = () => {
  return (
    <>
      <Button component={RouterLink} variant="contained" to="/">
        Go to frontpage
      </Button>
      <svg
        style={{
          height: '100%',
          width: '100%',
          // position: 'absolute',
          top: 0,
          left: 0
        }}
      ></svg>
    </>
  );
};
