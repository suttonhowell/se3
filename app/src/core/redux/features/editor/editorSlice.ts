import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { DCRGraph } from '../../../models/DCRGraph';
import { RootState } from '../../store';

interface EditorState {
  graph?: DCRGraph;
}

const initialState: EditorState = {};

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
    changeTitle: (state, action: PayloadAction<string>) => {
      if (state.graph) {
        state.graph.metaData.name = action.payload;
      }
    },
  },
});

export const { createNewGraph, addActivity, changeTitle } = editorSlice.actions;

export const selectEditor = (state: RootState) => state.editor;

export default editorSlice.reducer;
