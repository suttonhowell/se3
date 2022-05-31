import EditIcon from '@mui/icons-material/EditRounded';
import SaveIcon from '@mui/icons-material/SaveAsRounded';
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ColorPicker } from '../../../components/inputFields/ColorPicker';
import { ActivityStyle, Aid, isActivity, Markings } from '../../../core/models/DCRGraph';
import {
  changeActivityLabel,
  changeMarking,
  changeStyle,
} from '../../../core/redux/features/editor/editorSlice';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

export const ContextMenu = () => {
  const selectedElement = useAppSelector((state) => state.editor.selectedElement);
  const dispatch = useAppDispatch();
  const [isLabelEditable, setIsLabelEditable] = useState(false);
  const [label, setLabel] = useState('');

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

  const handleOnSubmitColor = (styleProp: keyof ActivityStyle, aid: Aid) => (color: string) =>
    dispatch(changeStyle({ styleProp, color, aid }));

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isLabelEditable) {
      setIsLabelEditable(true);
    }
  };

  const handleChangeMarking = (
    e: React.ChangeEvent<HTMLInputElement>,
    markingsProp: keyof Markings,
    aid: Aid
  ) => {
    const value = e.target.checked;
    dispatch(changeMarking({ markingsProp, value, aid }));
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
        {isActivity(selectedElement) ? (
          <>
            <Box sx={{ pb: 2 }}>
              <Typography variant="h4">Options</Typography>
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
              {Object.keys(selectedElement.markings).map((key, index) => {
                const markingProp = key as keyof Markings;
                return (
                  <Box key={key}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={selectedElement.markings[markingProp]}
                          onChange={(e) => handleChangeMarking(e, markingProp, selectedElement.aid)}
                        />
                      }
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  </Box>
                );
              })}
            </Box>
            <Divider />
            <Box sx={{ py: 3 }}>
              <Typography gutterBottom variant="h4">
                Customization
              </Typography>
              <ColorPicker
                label="Background color"
                value={selectedElement.style.bgColor}
                onDispatch={handleOnSubmitColor('bgColor', selectedElement.aid)}
              />
              <ColorPicker
                label="Text color"
                value={selectedElement.style.textColor}
                onDispatch={handleOnSubmitColor('textColor', selectedElement.aid)}
              />
              <ColorPicker
                label="Border color"
                value={selectedElement.style.borderColor}
                onDispatch={handleOnSubmitColor('borderColor', selectedElement.aid)}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </Drawer>
  );
};
