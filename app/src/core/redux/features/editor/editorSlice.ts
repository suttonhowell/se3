import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Aid, DCRGraph, initialActivity, initialDCRGraph, Position } from '../../../../core/models';
import { addRelationReducer } from './editorReducers';

export enum ToolType {
  None = 'None',
  AddRelation = 'AddRelation',
}

export interface EditorState {
  graph: DCRGraph;
  selectedElement: Aid | null;
  offset: Position | null;
  usingTool: ToolType;
  addRelationArgs: Aid | null;
}

const initialState: EditorState = {
  graph: initialDCRGraph,
  selectedElement: null,
  offset: null,
  usingTool: ToolType.None,
  addRelationArgs: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createNewGraph: (state) => {
      state.graph = initialDCRGraph;
    },
    addActivity: (state) => {
      state.graph.activies.push(initialActivity());
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
    pickTool: (state, action: PayloadAction<ToolType>) => {
      state.usingTool = action.payload;
      // Deselects element when a special tool is picked
      if (action.payload !== ToolType.None) state.selectedElement = null;
      // Removes the addRelationArg if tool deactivated early
      if (action.payload !== ToolType.AddRelation) state.addRelationArgs = null;
    },
    moveActivity: (state, action: PayloadAction<{ aid: Aid; position: Position }>) => {
      const updatedActivities = state.graph.activies.map((activity) =>
        activity.aid !== action.payload.aid
          ? activity
          : { ...activity, position: action.payload.position }
      );
      state.graph.activies = updatedActivities;
    },
    addRelation: addRelationReducer,
  },
});

export const {
  addRelation,
  createNewGraph,
  addActivity,
  selectElement,
  setOffset,
  changeTitle,
  moveActivity,
  pickTool,
} = editorSlice.actions;

export default editorSlice.reducer;
