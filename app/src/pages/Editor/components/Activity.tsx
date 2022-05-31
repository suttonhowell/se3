import { Box } from '@mui/system';
import { Activity as ActivityType } from '../../../core/models';
import { ToolType } from '../../../core/redux/features/editor/editorSlice';
import { useAppSelector } from '../../../core/redux/hooks';
import { RelationToSelf } from './RelationToSelf';

interface ActivityProps extends ActivityType {}

export const Activity = (props: ActivityProps) => {
  const { selectedElement, isAddingRelation, addRelationArgs } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
    addRelationArgs: state.editor.addRelationArgs,
  }));
  const height = 150;
  const width = 100;
  const headerHeight = 30;
  const strokeWidth = 5;

  return (
    <g strokeWidth={strokeWidth} transform={`translate(${props.position.x},${props.position.y})`}>
      <Box
        component="rect"
        id={props.aid}
        className="draggable activity"
        sx={{
          cursor: isAddingRelation ? 'copy' : 'move',
          stroke: addRelationArgs === props.aid ? 'green' : undefined,
          '&:hover': {
            stroke: !isAddingRelation ? undefined : !addRelationArgs ? 'green' : 'red',
          },
        }}
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
        pointerEvents="none"
      />
      <text
        alignmentBaseline="middle"
        textAnchor="middle"
        x={width / 2}
        y={headerHeight + (height - headerHeight) / 2}
        pointerEvents="none"
        stroke="none"
        style={{ userSelect: 'none' }}
      >
        {props.label}
      </text>
      {props.relations.map((r, idx) => (
        <RelationToSelf key={r.rid} startPoint={{ x: 20 * idx, y: -strokeWidth / 2 }} />
      ))}
    </g>
  );
};
