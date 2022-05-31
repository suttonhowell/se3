import { AddActivity } from './components/AddActivity';
import { AddRelationFABTool } from './components/AddRelationFABTool';
import { Canvas } from './components/Canvas';
import { ContextMenu } from './components/ContextMenu';
import { TopToolbar } from './components/TopToolbar';

export const Editor = () => {
  return (
    <>
      <TopToolbar />
      <Canvas />
      <AddActivity />
      <ContextMenu />
      <AddRelationFABTool />
    </>
  );
};
