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
  Rid,
} from '../../../../core/models';
import { addRelationReducer } from './editorReducers';

export enum ToolType {
  None = 'None',
  AddRelation = 'AddRelation',
  EditRelation = 'EditRelation',
}

export enum SelectedElementType {
  None = 'None',
  Activity = 'Activity',
  RelationToSelf = 'RelationToSelf',
  RelationToOther = 'RelationToOther',
}

export interface EditorState {
  graph: DCRGraph;
  selectedElement: Aid | Rid | null;
  selectedElementType: SelectedElementType;
  offset: Position | null;
  usingTool: ToolType;
  addRelationType: RelationType;
  addRelationArgs: Aid | null;
}

const initialState: EditorState = {
  graph: initialDCRGraph,
  selectedElement: null,
  selectedElementType: SelectedElementType.None,
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
      state.usingTool = ToolType.None;
      state.addRelationArgs = null;
    },
    deleteActivity: (state) => {
      const selectedElement = state.selectedElement;
      if (selectedElement === null) return;
      if (state.selectedElementType === SelectedElementType.Activity) {
        state.graph.activities = state.graph.activities.filter(
          (activity) => activity.aid !== selectedElement
        );
      }
      if (state.selectedElementType === SelectedElementType.RelationToSelf) {
        const updatedActivities = state.graph.activities.map((a) => ({
          ...a,
          relationsToSelf: a.relationsToSelf.filter((r) => r.rid !== selectedElement),
        }));
        state.graph.activities = updatedActivities;
      }
      if (state.selectedElementType === SelectedElementType.RelationToOther) {
        const updatedActivities = state.graph.activities.map((a) => ({
          ...a,
          relationsToOthers: a.relationsToOthers.filter((r) => r.rid !== selectedElement),
        }));
        state.graph.activities = updatedActivities;
      }
      state.selectedElement = null;
    },
    selectElement: (
      state,
      action: PayloadAction<{ id: Aid | Rid | null; type?: SelectedElementType }>
    ) => {
      state.selectedElement = action.payload.id;
      state.selectedElementType = action.payload.type
        ? action.payload.type
        : SelectedElementType.None;
      state.usingTool = ToolType.None;
      // if (action.payload.type === SelectedElementType.RelationToOther) {
      //   const parent = state.graph.activities.find((a) =>
      //     a.relationsToOthers.some((r) => r.rid === action.payload.id)
      //   );
      //   console.log(parent);
      //   const relation = parent?.relationsToOthers.find((r) => r.rid === action.payload.id);
      //   state.addRelationType === relation?.type || RelationType.PreCondition;
      // }
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.graph.metaData.name = action.payload;
    },
    pickTool: (state, action: PayloadAction<ToolType>) => {
      state.usingTool = action.payload;
      if (action.payload === ToolType.EditRelation) return;
      if (action.payload !== ToolType.None) {
        // Deselects element when a special tool is picked
        state.selectedElement = null;
        state.selectedElementType = SelectedElementType.None;
      }
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
      const updatedActivities = state.graph.activities.map((activity) =>
        activity.aid !== action.payload.aid
          ? activity
          : { ...activity, position: action.payload.position }
      );
      state.graph.activities = updatedActivities;
    },
    editRelation: (state, action: PayloadAction<RelationType>) => {
      const selectedElement = state.selectedElement;
      if (state.selectedElementType === SelectedElementType.RelationToSelf) {
        const updatedActivities = state.graph.activities.map((a) => ({
          ...a,
          relationsToSelf: a.relationsToSelf.map((r) =>
            r.rid !== selectedElement ? r : { ...r, type: action.payload }
          ),
        }));
        state.graph.activities = updatedActivities;
      }
      if (state.selectedElementType === SelectedElementType.RelationToOther) {
        const updatedActivities = state.graph.activities.map((a) => ({
          ...a,
          relationsToOthers: a.relationsToOthers.map((r) =>
            r.rid !== selectedElement ? r : { ...r, type: action.payload }
          ),
        }));
        state.graph.activities = updatedActivities;
      }
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
  editRelation,
} = editorSlice.actions;

export default editorSlice.reducer;
