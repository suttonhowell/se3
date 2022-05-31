// ! This file is meant container large reducers to make the slice more readable
import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { Aid } from '../../../../core/models';
import {
  createNewRelationsToSelf,
  createNewRelationToOther,
} from '../../../../core/models/Relations';
import { EditorState } from './editorSlice';

export const addRelationReducer = (
  state: WritableDraft<EditorState>,
  action: PayloadAction<Aid | null>
) => {
  // Use null as payload to cancel addRelation
  if (!action.payload) {
    return { ...state, addRelationArgs: null };
  }
  const addRelationArgs = state.addRelationArgs;
  // No "from" args has been selected thus the payload is the "from" activity
  if (!addRelationArgs) {
    return { ...state, addRelationArgs: action.payload };
  }
  // Is Relation to self
  if (addRelationArgs === action.payload) {
    state.addRelationArgs = null;
    const updatedActivities = state.graph.activies.map((a) =>
      a.aid !== addRelationArgs
        ? a
        : { ...a, relations: [...a.relations, createNewRelationsToSelf(a.aid)] }
    );
    state.graph.activies = updatedActivities;
  } else {
    // Is Relation to other
    return {
      ...state,
      addRelationArgs: null,
      graph: {
        ...state.graph,
        relations: [
          ...state.graph.relations,
          createNewRelationToOther(addRelationArgs, action.payload),
        ],
      },
    };
  }
};
