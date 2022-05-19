import { Activity as ActivityType } from '../../../core/models/DCRGraph';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

interface ActivityProps extends ActivityType {}

export const Activity = (props: ActivityProps) => {
  const dispatch = useAppDispatch();
  const { selectedElement } = useAppSelector((state) => state.editor);

  const handleSelectElement = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectElement(props.aid));
  };

  return (
    <rect
      id={props.aid}
      className="draggable"
      x={props.position.x}
      y={props.position.y}
      onMouseDown={handleSelectElement}
      rx="10"
      ry="10"
      width="100"
      height="100"
      stroke={selectedElement === props.aid ? 'blue' : props.style.borderColor}
      fill={props.style.bgColor}
      strokeWidth="5"
      style={{ cursor: 'move' }}
    />
  );
};
