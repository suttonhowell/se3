import useEventListener from '../../core/hooks/useEventListener';
import { deleteActivity, pickTool, ToolType } from '../../core/redux/features/editor/editorSlice';
import { useAppDispatch } from '../../core/redux/hooks';
import { AddActivity } from './components/AddActivity';
import { AddRelationFABTool } from './components/AddRelationFABTool';
import { Canvas } from './components/Canvas';
import { ContextMenu } from './components/ContextMenu';
import { TopToolbar } from './components/TopToolbar';

export const Editor = () => {
  const dispatch = useAppDispatch();

  const onKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    const titleInputRef = document.getElementById('title-input');
    const activityLabelInputRef = document.getElementById('activity-label-input');
    const activeElement = document.activeElement;
    if (
      (key === 'Delete' || key === 'Backspace') &&
      activeElement !== activityLabelInputRef &&
      activeElement !== titleInputRef
    ) {
      dispatch(deleteActivity());
    }
    if (key === 'Escape') {
      dispatch(pickTool(ToolType.None));
    }
  };

  useEventListener('keydown', onKeyPress);

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
