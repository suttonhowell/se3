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
}

export interface RelationToOther {
  rid: Rid;
  from: Aid;
  to: Aid;
  type: RelationType;
}
