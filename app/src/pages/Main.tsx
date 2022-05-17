import { Box } from '@mui/material';
import { Canvas } from '../components/Canvas';
import { TopBar } from '../components/layout/TopBar';
import { TopToolbar } from './Editor/components/TopToolbar';

const drawerWidth = 56;

export const Main = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <TopBar />
      <TopToolbar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', height: '100%' }}>
        <Canvas />
      </Box>
    </Box>
  );
};
