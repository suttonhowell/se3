import { Box } from '@mui/material';
import { TopBar } from '../components/layout/TopBar';
import { AddActivity } from './Editor/components/AddActivity';
import { Canvas } from './Editor/components/Canvas';

const drawerWidth = 56;

export const Main = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <TopBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 8, height: '100%' }}
      >
        <Canvas />
        <AddActivity />
      </Box>
    </Box>
  );
};
