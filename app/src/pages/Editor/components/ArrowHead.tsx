import { Box } from '@mui/material';
import {
  circleRadius,
  endIconSizes,
  relationStrokeWidth,
  relationVectorShorteningResponse,
} from '../../../core/constants';
import { Position } from '../../../core/models/DCRGraph';
import { getRelationColor, RelationType } from '../../../core/models/Relations';
import { toRadians } from '../../../core/utils/svgUtils';

interface ArrowHeadProps {
  rotateDeg: number;
  position: Position;
  type: RelationType;
}

const XOffset = 0; // placement of the arrow tail points on the X axis from the middle
const YOffset = 4; // placement of the arrow tail points on the Y axis from the middle
const POffset = 8; // placement of the arrow point on the X axis from the begining

export const ArrowHead = ({ rotateDeg, position, type }: ArrowHeadProps) => {
  const { x, y } = position;

  let color = getRelationColor(type);

  const dString = `M ${x} ${y} L ${x - XOffset} ${y - YOffset} L ${x + POffset} ${y} L ${
    x - XOffset
  } ${y + YOffset} Z`;

  const symbolX =
    x + Math.cos(toRadians(rotateDeg)) * (relationVectorShorteningResponse + circleRadius);
  const symbolY =
    y + Math.sin(toRadians(rotateDeg)) * (relationVectorShorteningResponse + circleRadius);

  return (
    <>
      <Box
        component="path"
        d={dString}
        fill={color}
        stroke={color}
        transform={`rotate(${rotateDeg},${x},${y})`}
      />
      {type === RelationType.Condition && (
        <circle cx={symbolX} cy={symbolY} r={circleRadius} fill={color} />
      )}
      {type === RelationType.Include && (
        <path
          d={`M ${symbolX - circleRadius} ${symbolY} L ${
            symbolX + circleRadius
          } ${symbolY} M ${symbolX} ${symbolY + circleRadius} L ${symbolX} ${
            symbolY - circleRadius
          } Z`}
          fill={color}
          stroke={color}
          strokeWidth={relationStrokeWidth}
          transform={`rotate(${rotateDeg},${symbolX},${symbolY})`}
        />
      )}
      {type === RelationType.PreCondition && (
        <path
          d={`M ${symbolX - circleRadius} ${symbolY} L ${symbolX} ${symbolY + circleRadius} L ${
            symbolX + circleRadius
          } ${symbolY} L ${symbolX} ${symbolY - circleRadius} Z`}
          fill={color}
          stroke={color}
          transform={`rotate(${rotateDeg},${symbolX},${symbolY})`}
        />
      )}
      {type === RelationType.Milestone && (
        <path
          d={`M ${symbolX - circleRadius} ${symbolY} L ${symbolX} ${symbolY + circleRadius} L ${
            symbolX + circleRadius
          } ${symbolY} L ${symbolX} ${symbolY - circleRadius} Z`}
          fill="none"
          stroke={color}
          strokeWidth={relationStrokeWidth}
          transform={`rotate(${rotateDeg},${symbolX},${symbolY})`}
        />
      )}
      {type === RelationType.LogicalInclude && (
        <path
          d={`M ${symbolX - circleRadius} ${symbolY} L ${
            symbolX + circleRadius
          } ${symbolY} M ${symbolX} ${symbolY + circleRadius} L ${symbolX} ${
            symbolY - circleRadius
          } M ${symbolX - circleRadius} ${symbolY - circleRadius} L ${symbolX + circleRadius} ${
            symbolY - circleRadius
          } Z`}
          fill={color}
          stroke={color}
          strokeWidth={relationStrokeWidth}
        />
      )}
      {type === RelationType.NoResponse && (
        <path
          d={`M ${symbolX - circleRadius} ${symbolY + circleRadius} L ${symbolX + circleRadius} ${
            symbolY - circleRadius
          } M ${symbolX - circleRadius} ${symbolY - circleRadius} L ${symbolX + circleRadius} ${
            symbolY + circleRadius
          } Z`}
          fill={color}
          stroke={color}
          strokeWidth={relationStrokeWidth}
          transform={`rotate(${rotateDeg},${symbolX},${symbolY})`}
        />
      )}
      {type === RelationType.Exclude && (
        <text
          x={symbolX - circleRadius}
          y={symbolY}
          fill={color}
          fontSize={endIconSizes[0]}
          pointerEvents="none"
          stroke={color}
          style={{ userSelect: 'none' }}
        >
          %
        </text>
      )}
      {type === RelationType.Value && (
        <text
          x={symbolX - circleRadius}
          y={symbolY + circleRadius}
          fill={color}
          fontSize={endIconSizes[1]}
          pointerEvents="none"
          stroke="none"
          style={{ userSelect: 'none' }}
        >
          =
        </text>
      )}
      {type === RelationType.Spawn && (
        <text
          x={symbolX - circleRadius}
          y={symbolY + circleRadius}
          fill={color}
          fontSize={endIconSizes[2]}
          pointerEvents="none"
          stroke="none"
          style={{ userSelect: 'none' }}
        >
          ＊
        </text>
      )}
    </>
  );
};
