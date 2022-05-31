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
