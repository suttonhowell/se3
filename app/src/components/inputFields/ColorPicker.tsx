import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { useEffect, useMemo, useState } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { ActivityStyle, Aid } from '../../core/models';

extend([namesPlugin]);

interface ColorPickerProps {
  label: string;
  value: string;
  onDispatch: (color: string) => {
    payload: { styleProp: keyof ActivityStyle; color: string; aid: Aid };
    type: string;
  };
}
export const ColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState<string>(props.value);
  const [colorInput, setColorInput] = useState<string>(props.value);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  // Converts arbitrary color strings to rgba color code
  const rgbaString = useMemo(() => {
    return color.startsWith('rgba') ? color : colord(color).toRgbString();
  }, [color]);

  useEffect(() => {
    setColor(props.value);
    setColorInput(props.value);
  }, [props.value]);

  const handleOnChangeColorPicker = (newColor: string) => {
    setColor(newColor);
    setColorInput(newColor);
  };

  const handleOnChangeColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (colord(value).isValid()) {
      setColor(value);
    }
    setColorInput(value);
  };

  // Opens the colorpicker drop down
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnSubmit = () => {
    props.onDispatch(rgbaString);
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        pt: 0.5,
        pb: 1,
      }}
    >
      <Typography>{props.label}</Typography>
      <Box
        sx={(theme) => ({
          bgcolor: rgbaString,
          borderRadius: '100%',
          height: 20,
          width: 20,
          boxShadow: theme.shadows[3],
        })}
        onClick={handleClick}
      />
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="bottom-end"
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer + 1,
        })}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ display: 'flex', flexDirection: 'column', p: 3, maxWidth: 200 }}>
            <RgbaStringColorPicker color={rgbaString} onChange={handleOnChangeColorPicker} />
            <TextField
              margin="normal"
              size="small"
              value={colorInput}
              fullWidth
              onChange={handleOnChangeColorInput}
              sx={{ fontFamily: 'Monospace' }}
              inputProps={{
                sx: {
                  fontSize: '0.7rem',
                  textAlign: 'center',
                  fontFamily: 'Monospace',
                  letterSpacing: 0,
                  lineHeight: theme.typography.body2.lineHeight,
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button color="error" size="small" onClick={handleClose}>
                Cancel
              </Button>
              <Button color="success" variant="contained" size="small" onClick={handleOnSubmit}>
                Apply
              </Button>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
