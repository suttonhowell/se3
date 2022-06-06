import { v4 as uuidv4 } from 'uuid';
import { Aid } from './Activity';

export type Rid = string;

export enum RelationType {
  PreCondition,
  Response,
  LogicalInclude,
  NoResponse,
  Include,
  Exclude,
  Spawn,
  Condition,
  Milestone,
  Value,
}

export const getRelationColor = (type: RelationType) => {
  switch (type) {
    case RelationType.PreCondition:
      return 'orange';
    case RelationType.Response:
      return 'cornflowerblue';
    case RelationType.LogicalInclude:
      return 'green';
    case RelationType.NoResponse:
      return 'brown';
    case RelationType.Include:
      return 'green';
    case RelationType.Exclude:
      return 'red';
    case RelationType.Spawn:
      return 'black';
    case RelationType.Condition:
      return 'orange';
    case RelationType.Milestone:
      return 'purple';
    case RelationType.Value:
      return 'gray';
  }
};

export const hasDot = (type: RelationType) => {
  return (
    type === RelationType.Response ||
    type === RelationType.LogicalInclude ||
    type === RelationType.NoResponse ||
    type === RelationType.Include ||
    type === RelationType.Exclude
  );
};

export interface RelationToSelf {
  rid: Rid;
  type: RelationType;
  aid: Aid;
}

export const createNewRelationsToSelf = (
  aid: Aid,
  type: RelationType = RelationType.PreCondition
): RelationToSelf => {
  return { rid: uuidv4(), type, aid };
};

export interface RelationToOther {
  rid: Rid;
  from: Aid;
  to: Aid;
  type: RelationType;
}

export const createNewRelationToOther = (
  from: Aid,
  to: Aid,
  type: RelationType = RelationType.PreCondition
) => {
  return { rid: uuidv4(), from, to, type };
};
