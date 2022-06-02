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
  if (action.payload === null) {
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
    const updatedActivities = state.graph.activities.map((a) =>
      a.aid !== addRelationArgs
        ? a
        : { ...a, relationsToSelf: [...a.relationsToSelf, createNewRelationsToSelf(a.aid)] }
    );
    state.graph.activities = updatedActivities;
  } else {
    // Is Relation to other
    const updatedActivities = state.graph.activities.map((a) =>
      a.aid !== addRelationArgs
        ? a
        : {
            ...a,
            relationsToOthers: [
              ...a.relationsToOthers,
              // For some reason TS need the string casting even though we return if null earlier
              createNewRelationToOther(addRelationArgs, action.payload as string),
            ],
          }
    );
    state.graph.activities = updatedActivities;
    state.addRelationArgs = null;
  }
};
