import { Box, useTheme } from '@mui/material';
import {
  circleRadius,
  relationStrokeWidth,
  relationVectorShortening,
  relationVectorShorteningResponse,
} from '../../../core/constants';
import { Position, RelationToOther as RelationToOtherModel } from '../../../core/models';
import { getActivityRelationPoints } from '../../../core/models/Activity';
import { getRelationColor, hasDot, RelationType } from '../../../core/models/Relations';
import {
  pickTool,
  SelectedElementType,
  selectElement,
  ToolType,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';
import { getUnitVector, getVectorAngle, getVectorLength } from '../../../core/utils/svgUtils';
import { ArrowHead } from './ArrowHead';

interface RelationToOtherProps extends RelationToOtherModel {
  // fromPosition: Position;
  fromAid: string;
  toAid: string;
  index: number;
}

interface RectSides {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface RelationsPostions {
  from: Position;
  to: Position;
  distance: number;
}

const compare = (a: RelationsPostions, b: RelationsPostions) => {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
};

export const RelationToOther = (props: RelationToOtherProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { graph, selectedElement, isAddingRelation, fromActivity, toActivity } = useAppSelector(
    (state) => ({
      graph: state.editor.graph,
      selectedElement: state.editor.selectedElement,
      isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
      fromActivity: state.editor.graph.activities.find((a) => a.aid === props.fromAid),
      toActivity: state.editor.graph.activities.find((a) => a.aid === props.toAid),
    })
  );

  if (!fromActivity || !toActivity) {
    return <></>;
  }

  const fromPositions = getActivityRelationPoints(fromActivity);
  const toPositions = getActivityRelationPoints(toActivity);

  const combinedPositions = [];

  for (const fromPosition of fromPositions) {
    for (const toPosition of toPositions) {
      combinedPositions.push({
        from: fromPosition,
        to: toPosition,
        distance: (fromPosition.x - toPosition.x) ** 2 + (fromPosition.y - toPosition.y) ** 2,
      });
    }
  }
  combinedPositions.sort(compare);
  const shortest = combinedPositions[props.index];

  const { x: x1, y: y1 } = shortest.from;

  let color = getRelationColor(props.type);

  const startDot = hasDot(props.type);

  const unitVector = getUnitVector(shortest.from, shortest.to);
  const vectorLength = getVectorLength(shortest.from, shortest.to);
  const vectorAng = getVectorAngle(shortest.from, shortest.to);
  const newLength =
    props.type === RelationType.Response
      ? vectorLength - relationVectorShorteningResponse
      : vectorLength - relationVectorShortening;
  const newVector = { x: unitVector.x * newLength, y: unitVector.y * newLength };

  const boundingBox = {
    x: Math.min(x1, x1 + newVector.x) - 20,
    y: Math.min(y1, y1 + newVector.y) - 20,
    height: Math.max(y1, y1 + newVector.y) - Math.min(y1, y1 + newVector.y) + 40,
    width: Math.max(x1, x1 + newVector.x) - Math.min(x1, x1 + newVector.x) + 40,
  };

  const handleOnClick = () => {
    if (!isAddingRelation) {
      dispatch(selectElement({ id: props.rid, type: SelectedElementType.RelationToOther }));
      dispatch(pickTool(ToolType.EditRelation));
    }
  };

  return (
    <>
      {startDot && <circle cx={x1} cy={y1} r={circleRadius} fill={color} />}
      <Box
        component="path"
        d={`M ${x1} ${y1} L ${x1 + newVector.x} ${y1 + newVector.y}`}
        fill="none"
        stroke={color}
        strokeWidth={relationStrokeWidth}
      />
      <Box
        component="path"
        d={`M ${x1} ${y1} L ${x1 + newVector.x} ${y1 + newVector.y}`}
        fill="none"
        stroke="transparent"
        strokeWidth={10}
        sx={{ cursor: !isAddingRelation ? 'pointer' : 'default' }}
        onClick={handleOnClick}
      />
      <ArrowHead
        rotateDeg={vectorAng}
        position={{ x: x1 + newVector.x, y: y1 + newVector.y }}
        type={props.type}
      />
      {selectedElement === props.rid && (
        <rect
          x={boundingBox.x}
          y={boundingBox.y}
          height={boundingBox.height}
          width={boundingBox.width}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth={1}
          strokeDasharray={'4,2'}
        />
      )}
    </>
  );
};
