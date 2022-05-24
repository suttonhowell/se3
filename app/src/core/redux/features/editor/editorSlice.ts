import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Aid, DCRGraph, Position } from '../../../models/DCRGraph';

interface EditorState {
  graph: DCRGraph;
  selectedElement: Aid | null;
  offset: Position | null;
}

const initialState: EditorState = {
  graph: {
    activities: [],
    metaData: {
      name: 'Untitled.dcr',
    },
  },
  selectedElement: null,
  offset: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createNewGraph: (state) => {
      state.graph = {
        activities: [],
        metaData: {
          name: 'Untitled.dcr',
        },
      };
    },
    addActivity: (state) => {
      state.graph?.activities.push({
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
        relations: [],
        nestedActivities: [],
      });
    },
    selectElement: (state, action: PayloadAction<Aid | null>) => {
      state.selectedElement = action.payload;
    },
    setOffset: (state, action: PayloadAction<Position | null>) => {
      state.offset = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.graph.metaData.name = action.payload;
    },
    changeActivityLabel: (state, action: PayloadAction<{ label: string; aid: string | null }>) => {
      if (action.payload.aid) {
        const updatedActivities = state.graph.activities.map((activity) =>
          activity.aid === action.payload.aid
            ? { ...activity, label: action.payload.label }
            : activity
        );
        state.graph.activities = updatedActivities;
      }
      return state;
    },
    moveActivity: (state, action: PayloadAction<{ aid: Aid; position: Position }>) => {
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== action.payload.aid
          ? activity
          : { ...activity, position: action.payload.position }
      );
      state.graph.activities = updatedActivities;
    },
  },
});

export const {
  createNewGraph,
  addActivity,
  selectElement,
  setOffset,
  changeTitle,
  moveActivity,
  changeActivityLabel,
} = editorSlice.actions;

export default editorSlice.reducer;
