import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

export const AppContainer = () => {
  return (
    <Box
      component={Paper}
      sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      elevation={1}
    >
      <TopBar />
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
