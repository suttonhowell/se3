import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Aid, DCRGraph, initialActivity, initialDCRGraph, Position } from '../../../../core/models';

interface EditorState {
  graph: DCRGraph;
  selectedElement: Aid | null;
  offset: Position | null;
}

const initialState: EditorState = {
  graph: initialDCRGraph,
  selectedElement: null,
  offset: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createNewGraph: (state) => {
      state.graph = initialDCRGraph;
    },
    addActivity: (state) => {
      state.graph?.activies.push(initialActivity);
    },
    selectElement: (state, action: PayloadAction<Aid | null>) => {
      state.selectedElement = action.payload;
    },
    setOffset: (state, action: PayloadAction<Position | null>) => {
      state.offset = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      if (state.graph) {
        state.graph.metaData.name = action.payload;
      }
    },
    moveActivity: (state, action: PayloadAction<{ aid: Aid; position: Position }>) => {
      if (state.graph) {
        const updatedActivities = state.graph.activies.map((activity) =>
          activity.aid !== action.payload.aid
            ? activity
            : { ...activity, position: action.payload.position }
        );
        state.graph.activies = updatedActivities;
      }
    },
  },
});

export const { createNewGraph, addActivity, selectElement, setOffset, changeTitle, moveActivity } =
  editorSlice.actions;

export default editorSlice.reducer;
