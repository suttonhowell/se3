import { Box } from '@mui/material';
import { TopBar } from '../components/layout/TopBar';
import { AddActivity } from './Editor/components/AddActivity';
import { Canvas } from './Editor/components/Canvas';

const drawerWidth = 56;

export const Main = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <TopBar />
      <Canvas />
      <AddActivity />
    </Box>
  );
};
