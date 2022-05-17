import { AddActivity } from './components/AddActivity';
import { Canvas } from './components/Canvas';
import { TopToolbar } from './components/TopToolbar';

const drawerWidth = 56;

export const Editor = () => {
  return (
    <>
      <TopToolbar />
      <Canvas />
      <AddActivity />
    </>
  );
};
