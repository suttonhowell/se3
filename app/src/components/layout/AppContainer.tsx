import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

export const AppContainer = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column', bgColor: 'background' }}>
      <TopBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', mt: 8, height: '100%' }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
