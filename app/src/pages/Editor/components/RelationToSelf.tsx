import { circleRadius, relationStrokeWidth } from '../../../core/constants';
import { Position, RelationToSelf as RelationToSelfModel } from '../../../core/models';
import { getRelationColor, hasDot } from '../../../core/models/Relations';
import { createRelationToSelfDPath } from '../../../core/utils';
import { ArrowHead } from './ArrowHead';

interface RelationToSelfProps extends RelationToSelfModel {
  startPoint: Position;
}

export const RelationToSelf = (props: RelationToSelfProps) => {
  let color = getRelationColor(props.type);
  const { x: x1, y: y1 } = props.startPoint;
  const startDot = hasDot(props.type);

  return (
    <>
      {startDot && <circle cx={x1 + 10} cy={y1} r={circleRadius / 1.2} fill={color} />}
      <path
        d={createRelationToSelfDPath(props.startPoint)}
        stroke={color}
        strokeWidth={relationStrokeWidth}
        fill="none"
      />
      <ArrowHead rotateDeg={60} position={{ x: x1 - 5, y: y1 - 5 }} type={props.type} />
    </>
  );
};
