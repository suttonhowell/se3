import { Box } from '@mui/material';
import { circleRadius, relationStrokeWidth } from '../../../core/constants';
import { Position, RelationToSelf as RelationToSelfModel } from '../../../core/models';
import { getRelationColor, hasDot } from '../../../core/models/Relations';
import {
  pickTool,
  SelectedElementType,
  selectElement,
  ToolType,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { createRelationToSelfDPath } from '../../../core/utils';
import { ArrowHead } from './ArrowHead';

interface RelationToSelfProps extends RelationToSelfModel {
  startPoint: Position;
}

export const RelationToSelf = (props: RelationToSelfProps) => {
  const dispatch = useAppDispatch();
  const { selectedElement, isAddingRelation } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
  }));
  let color = getRelationColor(props.type);
  const { x: x1, y: y1 } = props.startPoint;
  const startDot = hasDot(props.type);

  const handleOnClick = () => {
    if (!isAddingRelation) {
      dispatch(selectElement({ id: props.rid, type: SelectedElementType.RelationToSelf }));
      dispatch(pickTool(ToolType.EditRelation));
    }
  };

  return (
    <>
      {startDot && <circle cx={x1 + 10} cy={y1} r={circleRadius / 1.2} fill={color} />}
      <Box
        component="path"
        d={createRelationToSelfDPath(props.startPoint)}
        stroke={color}
        strokeWidth={relationStrokeWidth}
        fill="none"
      />
      <ArrowHead rotateDeg={60} position={{ x: x1 - 5, y: y1 - 5 }} type={props.type} />
      {selectedElement === props.rid && (
        <rect
          x={x1 - 15}
          y={y1 - 25}
          width={30}
          height={40}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray={'4,2'}
        />
      )}
      {/* Clickable area */}
      <Box
        component="rect"
        x={x1 - 15}
        y={y1 - 25}
        width={30}
        height={40}
        fill="transparent"
        sx={{ cursor: !isAddingRelation ? 'pointer' : 'default' }}
        onClick={handleOnClick}
      />
    </>
  );
};
