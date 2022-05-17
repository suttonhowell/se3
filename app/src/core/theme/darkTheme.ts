import { createTheme } from '@mui/material';
import typography from './typography';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography,
});

export default darkTheme;
