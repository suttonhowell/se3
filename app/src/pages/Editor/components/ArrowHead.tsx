import { Position } from '../../../core/models/DCRGraph';
import { createPathDString } from '../../../core/utils';

interface ArrowHeadProps {
  rotateDeg: number;
  position: Position;
  color?: string;
}

const XOffset = 0; // placement of the arrow tail points on the X axis from the middle
const YOffset = 3; // placement of the arrow tail points on the Y axis from the middle
const POffset = 6; // placement of the arrow point on the X axis from the begining
// TODO hardcord the d property
export const ArrowHead = ({ rotateDeg, position, color }: ArrowHeadProps) => {
  const { x, y } = position;

  const dPath = createPathDString(
    { x, y },
    [
      { x: x - XOffset, y: y - YOffset },
      { x: x + POffset, y },
      { x: x - XOffset, y: y + YOffset },
    ],
    true
  );

  return (
    <path d={dPath} fill={color} stroke={color} transform={`rotate(${rotateDeg},${x},${y})`} />
  );
};
