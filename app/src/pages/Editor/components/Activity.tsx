import { Activity as ActivityType } from '../../../core/models/DCRGraph';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

interface ActivityProps extends ActivityType {}

export const Activity = (props: ActivityProps) => {
  const dispatch = useAppDispatch();
  const { selectedElement } = useAppSelector((state) => state.editor);
  const height = 150;
  const width = 100;
  const headerHeight = 30;
  const strokeWidth = 5;

  const handleSelectElement = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectElement(props.aid));
  };

  return (
    <g
      id={props.aid}
      strokeWidth={strokeWidth}
      transform={`translate(${props.position.x},${props.position.y})`}
    >
      <rect
        className="draggable"
        onMouseDown={handleSelectElement}
        style={{ cursor: 'move' }}
        rx="10"
        ry="10"
        width={width}
        height={height}
        stroke={selectedElement === props.aid ? 'blue' : props.style.borderColor}
        fill={props.style.bgColor}
      />
      <path
        d={`M ${strokeWidth / 2} ${headerHeight} H ${width - strokeWidth / 2}`}
        stroke="black"
      />
      <text
        alignmentBaseline="middle"
        textAnchor="middle"
        x={width / 2}
        y={headerHeight + (height - headerHeight) / 2}
        pointerEvents="none"
        stroke="none"
      >
        {props.label}
      </text>
    </g>
  );
};
