import { createTheme } from '@mui/material';
import typography from './typography';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography,
});

export default lightTheme;
