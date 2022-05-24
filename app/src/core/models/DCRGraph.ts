export interface DCRGraph {
  activies: Activity[];
  metaData: {
    name: string;
    // Saved for meta data
  };
}

export interface Activity {
  aid: Aid;
  label: string;
  position: Position;
  markings: {
    pending: boolean;
    included: boolean;
    executed: boolean;
  };
  // Visuals
  customization: {
    // borderColor: string
    // textColor: string;
    // bgColor: string;
    // borderType: BorderType;
  };
  relations: Relation[];
  parrent: Aid;
  nestedActivities: Activity[];
}

type Aid = string;
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
