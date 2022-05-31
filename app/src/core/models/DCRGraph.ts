import { Activity } from './Activity';
import { RelationToOther } from './Relations';

export interface DCRGraph {
  activies: Activity[];
  relations: RelationToOther[];
  metaData: {
    name: string;
  };
}

export const initialDCRGraph: DCRGraph = {
  activies: [],
  relations: [],
  metaData: {
    name: 'Untitled',
  },
};

export interface Position {
  x: number;
  y: number;
}
