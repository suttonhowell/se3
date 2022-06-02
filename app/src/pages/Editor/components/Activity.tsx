import { Box } from '@mui/system';
import {
  activityHeaderHeight,
  activityHeight,
  activityStrokeWidth,
  activityWidth,
  relationFromColor,
  relationToColor,
} from '../../../core/constants';
import { Activity as ActivityType } from '../../../core/models';
import { ToolType } from '../../../core/redux/features/editor/editorSlice';
import { useAppSelector } from '../../../core/redux/hooks';
import { RelationToOther } from './RelationToOther';
import { RelationToSelf } from './RelationToSelf';

interface ActivityProps extends ActivityType {}

export const Activity = (props: ActivityProps) => {
  const { selectedElement, isAddingRelation, addRelationArgs } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
    addRelationArgs: state.editor.addRelationArgs,
  }));

  return (
    <>
      <g
        strokeWidth={activityStrokeWidth}
        transform={`translate(${props.position.x},${props.position.y})`}
      >
        <Box
          component="rect"
          id={props.aid}
          className="draggable activity"
          sx={{
            cursor: isAddingRelation ? 'copy' : 'move',
            stroke: addRelationArgs === props.aid ? relationFromColor : undefined,
            '&:hover': {
              stroke: !isAddingRelation
                ? undefined
                : !addRelationArgs
                ? relationFromColor
                : relationToColor,
            },
          }}
          rx="10"
          ry="10"
          width={activityWidth}
          height={activityHeight}
          stroke={selectedElement?.aid === props.aid ? 'blue' : props.style.borderColor}
          fill={props.style.bgColor}
        />
        <path
          d={`M ${activityStrokeWidth / 2} ${activityHeaderHeight} H ${
            activityWidth - activityStrokeWidth / 2
          }`}
          stroke="black"
          pointerEvents="none"
        />
        <text
          alignmentBaseline="middle"
          textAnchor="middle"
          x={activityWidth / 2}
          y={activityHeaderHeight + (activityHeight - activityHeaderHeight) / 2}
          pointerEvents="none"
          stroke="none"
          style={{ userSelect: 'none' }}
        >
          {props.label}
        </text>
        {props.relationsToSelf.map((rs, idx) => (
          <RelationToSelf key={rs.rid} startPoint={{ x: 20 * idx, y: -activityStrokeWidth / 2 }} />
        ))}
      </g>
      {props.relationsToOthers.map((rt, idx) => (
        <RelationToOther key={rt.rid} fromPosition={props.position} {...rt} />
      ))}
    </>
  );
};
