import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ActivityStyle,
  Aid,
  DCRGraph,
  initialActivity,
  initialDCRGraph,
  Markings,
  Position,
  RelationType,
} from '../../../../core/models';
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
  addRelationType: RelationType;
  addRelationArgs: Aid | null;
}

const initialState: EditorState = {
  graph: initialDCRGraph,
  selectedElement: null,
  offset: null,
  usingTool: ToolType.None,
  addRelationType: RelationType.PreCondition,
  addRelationArgs: null,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    createNewGraph: (state) => {
      state.graph = initialDCRGraph;
    },
    openGraph: (state, action: PayloadAction<string>) => {
      function idsAreDistinct(ids: Array<string>): boolean {
        return (
          JSON.stringify(ids.sort()) ==
          JSON.stringify(
            ids
              .filter((value, index, self) => {
                return self.indexOf(value) == index;
              })
              .sort()
          )
        );
      }

      function relationsPointToExistingActivities(g: DCRGraph): boolean {
        // TODO: implement when relations functionality is finished and merged
        return true;
      }

      function isValidDCRGraph(g: DCRGraph): boolean {
        return (
          idsAreDistinct(
            g.activities.map((a) => {
              return a.aid;
            })
          ) && relationsPointToExistingActivities(g)
        );
      }

      try {
        const graph: DCRGraph = JSON.parse(action.payload);
        if (isValidDCRGraph(graph)) state.graph = graph;
        else throw new Error('Invalid DCR Graph');
      } catch (error) {
        alert("The file you chose doesn't contain a valid DCR graph: " + error.message);
      }
    },
    addActivity: (state) => {
      state.graph.activities.push(initialActivity());
    },
    deleteActivity: (state) => {
      const selectedElement = state.selectedElement;
      if (selectedElement === null) return;
      state.graph.activities = state.graph.activities.filter(
        (activity) => activity.aid !== selectedElement
      );
      state.selectedElement = null;
    },
    selectElement: (state, action: PayloadAction<Aid | null>) => {
      state.selectedElement = action.payload;
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
    chooseRelationType: (state, action: PayloadAction<RelationType>) => {
      state.addRelationType = action.payload;
    },
    changeActivityLabel: (state, action: PayloadAction<{ label: string; aid: string | null }>) => {
      const { label, aid } = action.payload;
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== aid ? activity : { ...activity, label }
      );
      state.graph.activities = updatedActivities;
    },
    moveActivity: (state, action: PayloadAction<{ aid: Aid; position: Position }>) => {
      console.log('moving activity', action.payload);
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== action.payload.aid
          ? activity
          : { ...activity, position: action.payload.position }
      );
      state.graph.activities = updatedActivities;
    },
    changeStyle: (
      state,
      action: PayloadAction<{ styleProp: keyof ActivityStyle; color: string; aid: Aid }>
    ) => {
      const { styleProp, color, aid } = action.payload;
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== aid
          ? activity
          : { ...activity, style: { ...activity.style, [styleProp]: color } }
      );
      state.graph.activities = updatedActivities;
    },
    changeMarking: (
      state,
      action: PayloadAction<{ markingsProp: keyof Markings; value: boolean; aid: Aid }>
    ) => {
      const { markingsProp, value, aid } = action.payload;
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== aid
          ? activity
          : { ...activity, markings: { ...activity.markings, [markingsProp]: value } }
      );
      state.graph.activities = updatedActivities;
    },
    addRelation: addRelationReducer,
  },
});

export const {
  addRelation,
  chooseRelationType,
  pickTool,
  createNewGraph,
  openGraph,
  addActivity,
  changeTitle,
  moveActivity,
  changeActivityLabel,
  changeMarking,
  changeStyle,
  deleteActivity,
  selectElement,
} = editorSlice.actions;

export default editorSlice.reducer;
