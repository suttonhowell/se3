import { Box, Drawer, TextField, Toolbar, Typography } from '@mui/material';
import { ColorPicker } from '../../../components/inputFields/ColorPicker';
import { useAppSelector } from '../../../core/redux/hooks';

export const ContextMenu = () => {
  const { selectedElement, activities } = useAppSelector((state) => ({
    selectedElement: state.editor.selectedElement,
    activities: state.editor.graph.activities,
  }));

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
