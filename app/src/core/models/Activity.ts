import { v4 as uuidv4 } from 'uuid';
import { Position } from './DCRGraph';
import { RelationToOther, RelationToSelf } from './Relations';

export type Aid = string;

export interface Activity {
  aid: Aid;
  label: string;
  position: Position;
  markings: {
    pending: boolean;
    included: boolean;
    executed: boolean;
  };
  style: {
    borderColor: string;
    textColor: string;
    bgColor: string;
  };
  relationsToSelf: RelationToSelf[];
  relationsToOthers: RelationToOther[];
  parrent?: Aid;
  nestedActivities: Activity[];
}

// TODO check that Aids are not the same when a new one is created
export const initialActivity = (): Activity => ({
  aid: uuidv4(),
  label: 'Activity',
  position: { x: 100, y: 100 },
  markings: {
    pending: false,
    included: true,
    executed: false,
  },
  style: {
    borderColor: 'black',
    bgColor: 'white',
    textColor: 'black',
  },
  relationsToSelf: [],
  relationsToOthers: [],
  nestedActivities: [],
});
