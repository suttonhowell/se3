import { Activity as ActivityType } from '../../../core/models/DCRGraph';
import { selectElement } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

interface ActivityProps extends ActivityType {}

export const Activity = (props: ActivityProps) => {
  const dispatch = useAppDispatch();
  const { selectedElementAid } = useAppSelector((state) => state.editor);
  const height = 150;
  const width = 100;
  const headerHeight = 30;
  const strokeWidth = 3;

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
        stroke={selectedElementAid === props.aid ? 'blue' : props.style.borderColor}
        fill={props.style.bgColor}
        strokeDasharray={!props.markings.included ? '12 4' : undefined}
      />
      <path
        d={`M ${strokeWidth / 2} ${headerHeight} H ${width - strokeWidth / 2}`}
        stroke={selectedElementAid === props.aid ? 'blue' : props.style.borderColor}
        strokeDasharray={!props.markings.included ? '12 4' : undefined}
      />
      <text
        alignmentBaseline="middle"
        textAnchor="middle"
        x={width / 2}
        y={headerHeight + (height - headerHeight) / 2}
        pointerEvents="none"
        stroke="none"
        fill={props.style.textColor}
      >
        {props.label}
      </text>
      {props.markings.pending && (
        <text
          x={strokeWidth + 65}
          y={headerHeight + 25}
          pointerEvents="none"
          stroke="none"
          fill={'orange'}
          fontSize="larger"
        >
          !
        </text>
      )}
      {props.markings.executed && (
        <text
          x={strokeWidth + 75}
          y={headerHeight + 25}
          pointerEvents="none"
          stroke="none"
          fill={'green'}
          fontSize="larger"
        >
          ✓
        </text>
      )}
    </g>
  );
};
