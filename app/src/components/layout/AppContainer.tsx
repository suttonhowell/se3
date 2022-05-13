import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

export const AppContainer = () => {
  return (
    <Box
      component={Paper}
      sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}
      elevation={2}
    >
      <TopBar />
      <Box component="main" sx={{ flexGrow: 1, mt: 8, height: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
