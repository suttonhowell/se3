import { Position } from '../../../core/models';
import { createRelationToSelfDPath } from '../../../core/utils';

interface RelationToSelfProps {
  startPoint: Position;
}

export const RelationToSelf = (props: RelationToSelfProps) => {
  return (
    <path
      d={createRelationToSelfDPath(props.startPoint)}
      stroke="red"
      strokeWidth={2}
      fill="transparent"
    />
  );
};
