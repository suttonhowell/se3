import { circleRadius } from '../../../core/constants';
import { relationVectorShorteningResponse } from '../../../core/constants';
import { Position } from '../../../core/models/DCRGraph';
import { getRelationColor, RelationType } from '../../../core/models/Relations';
import { toRadians } from '../../../core/utils/svgUtils';

interface ArrowHeadProps {
  rotateDeg: number;
  position: Position;
  type: RelationType;
}

const XOffset = 0; // placement of the arrow tail points on the X axis from the middle
const YOffset = 5; // placement of the arrow tail points on the Y axis from the middle
const POffset = 10; // placement of the arrow point on the X axis from the begining
// TODO hardcord the d property
export const ArrowHead = ({ rotateDeg, position, type }: ArrowHeadProps) => {
  const { x, y } = position;

  let color = getRelationColor(type);

  const dString = `M ${x} ${y} L ${x - XOffset} ${y - YOffset} L ${x + POffset} ${y} L ${x - XOffset} ${y + YOffset} Z`;

  const symbolX = x + Math.cos(toRadians(rotateDeg)) * (relationVectorShorteningResponse + circleRadius);
  const symbolY = y + Math.sin(toRadians(rotateDeg)) * (relationVectorShorteningResponse + circleRadius);

  return (
    <>
      <path d={dString} fill={color} stroke={color} transform={`rotate(${rotateDeg},${x},${y})`} />
      {type === RelationType.Condition && <circle
        cx={symbolX}
        cy={symbolY}
        r={circleRadius}
        fill={color}
      />}
      // TODO: Fix plus symbol (maybe svg?)
      {type === RelationType.Include && <text
        x={symbolX}
        y={symbolY}
        fill={color}
        fontSize={40}
        pointerEvents="none"
        stroke="none"
        >+</text>}
    </>
  );
};
