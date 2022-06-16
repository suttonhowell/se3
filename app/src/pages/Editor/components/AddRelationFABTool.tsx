import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Autocomplete, Box, Fab, TextField, Tooltip, Zoom } from '@mui/material';
import { useState } from 'react';
import { RelationType } from '../../../core/models';
import {
  chooseRelationType,
  editRelation,
  pickTool,
  ToolType,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

export const AddRelationFABTool = () => {
  const { isAddRelationActive, isEdittingRelation } = useAppSelector((state) => ({
    isAddRelationActive: state.editor.usingTool === ToolType.AddRelation,
    isEdittingRelation: state.editor.usingTool === ToolType.EditRelation,
    // state.editor.selectedElement !== null &&
    // state.editor.selectedElementType === SelectedElementType.RelationToSelf &&
  }));
  const dispatch = useAppDispatch();
  const [chosenRelationType, setChosenRelationType] = useState(addRelationTypeItems[0]);

  const handleOnCloseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(pickTool(ToolType.None));
  };

  return (
    <Zoom in={isAddRelationActive || isEdittingRelation}>
      <Box sx={{ position: 'absolute', bottom: 16, right: 16, width: 300, display: 'flex' }}>
        <Autocomplete
          options={addRelationTypeItems}
          value={chosenRelationType}
          disableClearable
          onChange={(event: any, newValue: AddRelationTypeItem) => {
            setChosenRelationType(newValue);
            if (isEdittingRelation) {
              dispatch(editRelation(newValue.type));
            } else {
              dispatch(chooseRelationType(newValue.type));
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose relation type"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password',
              }}
            />
          )}
          sx={{ flexGrow: 1 }}
        />
        <Tooltip title='Deactivate "Add relation tool"' arrow>
          <Fab color="error" onClick={handleOnCloseClick} sx={{ ml: 2 }}>
            <CloseRoundedIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

interface AddRelationTypeItem {
  label: string;
  type: RelationType;
}

const addRelationTypeItems: readonly AddRelationTypeItem[] = [
  { label: 'Pre-condition', type: RelationType.PreCondition },
  { label: 'Response', type: RelationType.Response },
  { label: 'Logical Include', type: RelationType.LogicalInclude },
  { label: 'No-response', type: RelationType.NoResponse },
  { label: 'Include', type: RelationType.Include },
  { label: 'Exclude', type: RelationType.Exclude },
  { label: 'Spawn', type: RelationType.Spawn },
  { label: 'Condition', type: RelationType.Condition },
  { label: 'Milestone', type: RelationType.Milestone },
  { label: 'Value', type: RelationType.Value },
];
