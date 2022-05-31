import { Position } from '../models/DCRGraph';

interface CreateBezierCurveInput {
  controlPoint1: Position;
  controlPoint2: Position;
  endPoint: Position;
}

export const createBezierCurveString = (startPoint: Position, args: CreateBezierCurveInput) => {
  const {
    controlPoint1: { x: x1, y: y1 },
    controlPoint2: { x: x2, y: y2 },
    endPoint: { x, y },
  } = args;
  const { x: sx, y: sy } = startPoint;
  return `M ${sx} ${sy} C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;
};

const relationToSelfControlPoint1: Position = { x: -20, y: -30 };
const relationToSelfControlPoint2: Position = { x: -5, y: -25 };
const relationToSelfEndPointXOffset: number = -10;

export const createRelationToSelfDPath = ({ x, y }: Position) => {
  const { x: c1X, y: c1Y } = relationToSelfControlPoint1;
  const { x: c2X, y: c2Y } = relationToSelfControlPoint2;
  const endXOffset = relationToSelfEndPointXOffset;
  return `M ${x} ${y} C ${x + c1X} ${y + c1Y}, ${x + c2X} ${y + c2Y}, ${x - endXOffset} ${y}`;
};

// https://math.stackexchange.com/questions/477165/find-angle-at-point-on-bezier-curve
export const calculateBezierAngleAtPoint = () => {};

/**
 * Generate the d property used for the svg path component
 * @param startPoint - The starting position of the path.
 * @param points - The points that the path will be drawn along
 * @param  [closePath = false] - Whether or not the last should close the path
 * @returns {string} d - A string used to draw a path with
 */
export function createPathDString(
  startPoint: Position,
  points: Position[],
  closePath: Boolean = false
) {
  var d = '';
  if (points.length === 0) {
    return d;
  } else {
    d += `M ${startPoint.x} ${startPoint.x}`;
    points.forEach((point) => {
      d += ` L ${point.x} ${point.y}`;
    });
  }
  if (closePath) {
    d += ' Z';
  }

  return d;
}
