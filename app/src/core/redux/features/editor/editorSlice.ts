import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Aid, DCRGraph } from '../../../models/DCRGraph';

interface EditorState {
  graph?: DCRGraph;
  selectedElement: Aid | null;
}

const initialState: EditorState = {
  selectedElement: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createNewGraph: (state) => {
      state.graph = {
        activies: [],
        metaData: {
          name: 'Untitled.dcr',
        },
      };
    },
    addActivity: (state) => {
      state.graph?.activies.push({
        aid: uuidv4(),
        label: 'Activity',
        position: { x: 100, y: 100 },
        markings: {
          pending: false,
          included: false,
          executed: false,
        },
        customization: {},
        relations: [],
        nestedActivities: [],
      });
    },
    selectElement: (state, action: PayloadAction<Aid>) => {
      state.selectedElement = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      if (state.graph) {
        state.graph.metaData.name = action.payload;
      }
    },
  },
});

export const { createNewGraph, addActivity, selectElement, changeTitle } = editorSlice.actions;

export default editorSlice.reducer;
