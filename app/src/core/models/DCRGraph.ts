export interface DCRGraph {
  activities: Activity[];
  metaData: {
    name: string;
    // Saved for meta data
  };
}

export interface ActivityStyle {
  borderColor: string;
  textColor: string;
  bgColor: string;
}

export interface Markings {
  included: boolean;
  pending: boolean;
  executed: boolean;
}

export interface Activity {
  aid: Aid;
  label: string;
  position: Position;
  markings: Markings;
  style: ActivityStyle;
  relations: Relation[];
  parent: Aid | null;
  nestedActivities: Activity[];
}

export const isActivity = (obj: any): obj is Activity => {
  return (
    obj !== undefined &&
    obj !== null &&
    'aid' in obj &&
    'label' in obj &&
    'position' in obj &&
    'markings' in obj &&
    'style' in obj &&
    'relations' in obj &&
    'parrent' in obj &&
    'nestedActivities' in obj
  );
};

export type Aid = string;
enum RelationType {
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
export interface Relation {
  to: Aid;
  type: RelationType;
}

export interface Position {
  x: number;
  y: number;
}
