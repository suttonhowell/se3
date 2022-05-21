import { Box, Drawer, TextField, Toolbar, Typography } from '@mui/material';
import { ColorPicker } from '../../../components/inputFields/ColorPicker';
import { useAppSelector } from '../../../core/redux/hooks';

export const ContextMenu = () => {
  const { selectedElement, activies } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    activies: state.editor.graph?.activies,
  }));

  if (activies && selectedElement) {
    const activity = activies.find((a) => a.aid === selectedElement);
    console.log(activity);
  }

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
        <TextField size="small" label="Activity name" variant="standard" fullWidth />
        <ColorPicker label="Background color" />
        <ColorPicker label="Text color" />
        <ColorPicker label="Border color" />
      </Box>
    </Drawer>
  );
};
