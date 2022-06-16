import { Box, useTheme } from '@mui/material';
import {
  activityHeight,
  activityWidth,
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
}

interface RectSides {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const RelationToOther = (props: RelationToOtherProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { graph, selectedElement, isAddingRelation } = useAppSelector((state) => ({
    graph: state.editor.graph,
    selectedElement: state.editor.selectedElement,
    isAddingRelation: state.editor.usingTool === ToolType.AddRelation,
  }));

  let fromActivity = null;
  let toActivity = null;

  for (const a of graph.activities) {
    if (a.aid === props.fromAid) {
      fromActivity = a;
    }

    if (a.aid === props.toAid) {
      toActivity = a;
    }
  }

  if (!fromActivity || !toActivity) {
    return <></>;
  }

  const fromPositions = getActivityRelationPoints(fromActivity);
  const toPositions = getActivityRelationPoints(toActivity);

  // console.log(fromPositions, toPositions);

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

  // console.log(combinedPositions);

  let shortest = combinedPositions[0];

  for (let i = 0; i < combinedPositions.length; i++) {
    if (combinedPositions[i].distance < shortest.distance) {
      shortest = combinedPositions[i];
    }
  }

  // console.log(shortest);

  const { x: x1, y: y1 } = shortest.from;

  const { x: x2, y: y2 } = shortest.to;

  // pointingToPostion = { x: x2, y: y2 };

  // const { x: x1, y: y1 } = props.fromPosition;

  // const { x: x2, y: y2 } = pointingToPostion;

  let color = getRelationColor(props.type);

  const getActivityRect = ({ x, y }: Position) => ({
    top: y,
    bottom: y + activityHeight,
    left: x,
    right: x + activityWidth,
  });

  // const rect1 = getActivityRect({ x: x1, y: y1 });
  // const rect2 = getActivityRect({ x: x2, y: y2 });

  const getOuterRect = (r1: RectSides, r2: RectSides): RectSides => ({
    top: Math.min(r1.top, r2.top),
    bottom: Math.max(r1.bottom, r2.bottom),
    left: Math.min(r1.left, r2.left),
    right: Math.max(r1.right, r2.right),
  });

  // const getInnerXY = (r1: RectSides, r2: RectSides) => {};

  // const outerRect = getOuterRect(rect1, rect2);
  // const innerWidth = outerRect.right - outerRect.left - 2 * activityWidth;
  // const innerHeight = outerRect.bottom - outerRect.top - 2 * activityHeight;

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
