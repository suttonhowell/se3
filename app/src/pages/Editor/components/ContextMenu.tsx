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
import { useEffect, useRef, useState } from 'react';
import { ColorPicker } from '../../../components/inputFields/ColorPicker';
import { isActivity } from '../../../core/models/DCRGraph';
import { changeActivityLabel } from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

export const ContextMenu = () => {
  const { selectedElement } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
  }));
  const dispatch = useAppDispatch();
  const [isLabelEditable, setIsLabelEditable] = useState(false);
  const [label, setLabel] = useState('');
  const [colors, setColors] = useState({
    borderColor: 'black',
    bgColor: 'white',
    textColor: 'black',
  });
  const labelInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActivity(selectedElement)) {
      setLabel(selectedElement.label);
    }
  }, [selectedElement]);

  // Set focus on the activity label input when its clicked while being disabled
  useEffect(() => {
    if (isLabelEditable && labelInputRef.current) {
      labelInputRef.current.focus();
    }
  }, [isLabelEditable]);

  const handleOnSubmit = () => {
    if (isActivity(selectedElement)) {
      dispatch(changeActivityLabel({ label, aid: selectedElement.aid || '' }));
      setIsLabelEditable(false);
    } else {
      setIsLabelEditable(true);
    }
  };

  // Make label
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isLabelEditable) {
      setIsLabelEditable(true);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 20) return;
    setLabel(value);
  };
  console.log(selectedElement);
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
        <Box component="form" onSubmit={handleOnSubmit}>
          <TextField
            size="small"
            variant="outlined"
            label="Activity name"
            margin="normal"
            disabled={!isLabelEditable}
            fullWidth
            value={label}
            onChange={handleOnChange}
            onClick={handleOnClick}
            inputProps={{
              ref: labelInputRef,
              sx: { cursor: isLabelEditable ? 'text' : 'pointer' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleOnSubmit}>
                    {isLabelEditable ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
        <ColorPicker label="Background color" />
        <ColorPicker label="Text color" />
        <ColorPicker label="Border color" />
      </Box>
    </Drawer>
  );
};
