import {
  activityHeight,
  activityWidth,
  circleRadius,
  relationStrokeWidth,
  relationVectorShortening,
  relationVectorShorteningResponse,
} from '../../../core/constants';
import { Position, RelationToOther as RelationToOtherModel } from '../../../core/models';
import { getRelationColor, hasDot, RelationType } from '../../../core/models/Relations';
import { useAppSelector } from '../../../core/redux/hooks';
import { getUnitVector, getVectorAngle, getVectorLength } from '../../../core/utils/svgUtils';
import { ArrowHead } from './ArrowHead';

interface RelationToOtherProps extends RelationToOtherModel {
  fromPosition: Position;
}

interface RectSides {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const RelationToOther = (props: RelationToOtherProps) => {
  const { pointingToPostion } = useAppSelector((state) => ({
    pointingToPostion: state.editor.graph.activities.find((a) => a.aid === props.to)?.position || {
      x: 0,
      y: 0,
    },
  }));
  const { x: x1, y: y1 } = props.fromPosition;

  const { x: x2, y: y2 } = pointingToPostion;

  let color = getRelationColor(props.type);

  const getActivityRect = ({ x, y }: Position) => ({
    top: y,
    bottom: y + activityHeight,
    left: x,
    right: x + activityWidth,
  });

  const rect1 = getActivityRect({ x: x1, y: y1 });
  const rect2 = getActivityRect({ x: x2, y: y2 });

  const getOuterRect = (r1: RectSides, r2: RectSides): RectSides => ({
    top: Math.min(r1.top, r2.top),
    bottom: Math.max(r1.bottom, r2.bottom),
    left: Math.min(r1.left, r2.left),
    right: Math.max(r1.right, r2.right),
  });

  const getInnerXY = (r1: RectSides, r2: RectSides) => {};

  const outerRect = getOuterRect(rect1, rect2);
  const innerWidth = outerRect.right - outerRect.left - 2 * activityWidth;
  const innerHeight = outerRect.bottom - outerRect.top - 2 * activityHeight;

  const startDot = hasDot(props.type);

  const unitVector = getUnitVector(props.fromPosition, pointingToPostion);
  const vectorLength = getVectorLength(props.fromPosition, pointingToPostion);
  const vectorAng = getVectorAngle(props.fromPosition, pointingToPostion);
  const newLength =
    props.type === RelationType.Response
      ? vectorLength - relationVectorShorteningResponse
      : vectorLength - relationVectorShortening;
  const newVector = { x: unitVector.x * newLength, y: unitVector.y * newLength };
  // Steps:
  // 1: determine from where the arrows should orignate from by finding the angle from the one center to the next
  // if the angle is between -22,5 and 22,5 it is to the left*
  // https://gamedev.stackexchange.com/questions/154036/efficient-minimum-distance-between-two-axis-aligned-squares

  return (
    <>
      {startDot && <circle cx={x1} cy={y1} r={circleRadius} fill={color} />}
      <path
        d={`M ${x1} ${y1} L ${x1 + newVector.x} ${y1 + newVector.y}`}
        fill="none"
        stroke={color}
        strokeWidth={relationStrokeWidth}
      />
      <ArrowHead
        rotateDeg={vectorAng}
        position={{ x: x1 + newVector.x, y: y1 + newVector.y }}
        type={props.type}
      />
      {/* </g> */}
      {/* <rect
        className="inner"
        stroke="green"
        x={Math.min(x1 + activityWidth, x2)}
        y={Math.min(y1 + activityHeight, y2)}
        width={innerWidth}
        height={innerHeight}
        fill="none"
      />
      <rect
        fill="none"
        className="outer"
        stroke="red"
        y={outerRect.top}
        x={outerRect.left}
        width={outerRect.right - outerRect.left}
        height={outerRect.bottom - outerRect.top}
      /> */}
    </>
  );
};
