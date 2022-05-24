import EditIcon from '@mui/icons-material/EditRounded';
import SaveIcon from '@mui/icons-material/SaveAsRounded';
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ColorPicker } from '../../../components/inputFields/ColorPicker';
import { changeActivityLabel } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

export const ContextMenu = () => {
  const { selectedElement, activities } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    activities: state.editor.graph.activities,
  }));
  const dispatch = useAppDispatch();
  const [isLabelEditable, setIsLabelEditable] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedElement) {
      setLabel(activities.find((a) => a.aid === selectedElement)?.label || '');
    }
  }, [selectedElement]);

  const handleOnClick = () => {
    if (isLabelEditable) {
      dispatch(changeActivityLabel({ label, aid: selectedElement || '' }));
      setIsLabelEditable(false);
    } else {
      setIsLabelEditable(true);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 20) return;
    setLabel(value);
  };

  return (
    <Drawer
      anchor="right"
      hideBackdrop={true}
      variant="persistent"
      open={selectedElement ? true : false}
    >
      <Box sx={{ width: 300, p: 2 }}>
        <Toolbar />
        <Toolbar variant="dense" />
        <Typography>Customization</Typography>
        <TextField
          size="small"
          variant="filled"
          label="Activity name"
          disabled={!isLabelEditable}
          fullWidth
          value={label}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleOnClick}>
                  {isLabelEditable ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ColorPicker label="Background color" />
        <ColorPicker label="Text color" />
        <ColorPicker label="Border color" />
      </Box>
    </Drawer>
  );
};
