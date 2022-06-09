import { v4 as uuidv4 } from 'uuid';
import { Position } from './DCRGraph';
import { RelationToOther, RelationToSelf } from './Relations';
import { activityWidth, activityHeight} from '../constants';

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

export const getActivityRelationPoints = (activity: Activity): Position[] => {
  let points = [];

  // Corner points
  points.push({ x: activity.position.x, y: activity.position.y });
  points.push({ x: activity.position.x + activityWidth, y: activity.position.y });
  points.push({ x: activity.position.x, y: activity.position.y + activityHeight });
  points.push({ x: activity.position.x + activityWidth, y: activity.position.y + activityHeight });

  // Top points
  points.push({ x: activity.position.x + activityWidth / 4, y: activity.position.y });
  points.push({ x: activity.position.x + activityWidth / 2, y: activity.position.y });
  points.push({ x: activity.position.x + 3 * activityWidth / 4, y: activity.position.y });

  // Right points
  points.push({ x: activity.position.x + activityWidth, y: activity.position.y + activityHeight / 4 });
  points.push({ x: activity.position.x + activityWidth, y: activity.position.y + activityHeight / 2 });
  points.push({ x: activity.position.x + activityWidth, y: activity.position.y + 3 * activityHeight / 4 });

  // Bottom points
  points.push({ x: activity.position.x + activityWidth / 4, y: activity.position.y + activityHeight });
  points.push({ x: activity.position.x + activityWidth / 2, y: activity.position.y + activityHeight });
  points.push({ x: activity.position.x + 3 * activityWidth / 4, y: activity.position.y + activityHeight });

  // Left points
  points.push({ x: activity.position.x, y: activity.position.y + activityHeight / 4 });
  points.push({ x: activity.position.x, y: activity.position.y + activityHeight / 2 });
  points.push({ x: activity.position.x, y: activity.position.y + 3 * activityHeight / 4 });

  return points;
};
