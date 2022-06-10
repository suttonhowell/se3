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
    activies: [],
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
        activies: [],
        metaData: {
          name: 'Untitled.dcr',
        },
      };
    },
    openGraph: (state, action: PayloadAction<string>) => {

      function idsAreDistinct(ids: [Aid]): boolean {
        return false;
      }

      function relationsPointToexistingActivities(g: DCRGraph): boolean {
        return false;
      }

      function isValidDCRGraph(g: DCRGraph): boolean {
        console.log(g.activies.map((activity) => { return activity.relations }));
        return idsAreDistinct(["1"]) && relationsPointToexistingActivities(g)
      }

      try {
        const graph: DCRGraph = JSON.parse(action.payload);
        if (isValidDCRGraph(graph)) state.graph = graph;
        else throw new Error("Unvalid DCR Graph")
      } catch (error) {
        alert("The file you chose doesn't contain a valid DCR graph: " + error.message);
      }
    },
    addActivity: (state) => {
      state.graph?.activies.push({
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

export const { createNewGraph, openGraph, addActivity, selectElement, setOffset, changeTitle, moveActivity } =
  editorSlice.actions;

export default editorSlice.reducer;
