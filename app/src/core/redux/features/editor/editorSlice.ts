import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { List } from 'reselect/es/types';
import { v4 as uuidv4 } from 'uuid';
import { ActivityStyle, Aid, DCRGraph, Markings, Position } from '../../../models/DCRGraph';

interface EditorState {
  graph: DCRGraph;
  selectedElement: Aid | null;
}

const initialState: EditorState = {
  graph: {
    activities: [],
    metaData: {
      name: 'Untitled.dcr',
    },
  },
  selectedElement: null,
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
    openGraph: (state, action: PayloadAction<string>) => {

      function idsAreDistinct(ids: Array<string>): boolean {
        return JSON.stringify(ids.sort()) == JSON.stringify((ids.filter((value, index, self) => { return self.indexOf(value) == index })).sort())
      }

      function relationsPointToExistingActivities(g: DCRGraph): boolean {
        // TODO: implement when relations functionality is finished and merged
        return true;
      }

      function isValidDCRGraph(g: DCRGraph): boolean {
        return (idsAreDistinct(g.activities.map((a) => { return a.aid }))) && relationsPointToExistingActivities(g)
      }

      try {
        const graph: DCRGraph = JSON.parse(action.payload);
        if (isValidDCRGraph(graph)) state.graph = graph;
        else throw new Error("Invalid DCR Graph")
      } catch (error) {
        alert("The file you chose doesn't contain a valid DCR graph: " + error.message);
      }
    },
    addActivity: (state) => {
      state.graph.activities.push({
        aid: uuidv4(),
        label: 'Activity',
        position: { x: 100, y: 100 },
        markings: {
          pending: false,
          included: true,
          executed: false,
        },
        style: {
          borderColor: '#000000',
          bgColor: '#ffffff',
          textColor: '#000000',
        },
        relations: [],
        parent: null,
        nestedActivities: [],
      });
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
  },
});

export const {
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
