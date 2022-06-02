import { Activity } from './Activity';

export interface DCRGraph {
  activities: Activity[];
  metaData: {
    name: string;
  };
}

export const initialDCRGraph: DCRGraph = {
  activities: [],
  metaData: {
    name: 'Untitled',
  },
};

export interface Position {
  x: number;
  y: number;
}
