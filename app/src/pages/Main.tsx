import { AddActivity } from './Editor/components/AddActivity';
import { Canvas } from './Editor/components/Canvas';
import { TopToolbar } from './Editor/components/TopToolbar';

const drawerWidth = 56;

export const Main = () => {
  return (
    <>
      <TopToolbar />
      <Canvas />
      <AddActivity />
    </>
  );
};
