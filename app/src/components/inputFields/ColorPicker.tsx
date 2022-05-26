import { Box, Button, Menu, Typography } from '@mui/material';
import { useState } from 'react';
import { RgbaColor, RgbaColorPicker } from 'react-colorful';

const RGBAToString = (color: RgbaColor) =>
  `rgb(${color.r} ${color.g} ${color.b} / ${color.a * 100}%)`;

interface ColorPickerProps {
  label: string;
}
export const ColorPicker = (props: ColorPickerProps) => {
  const [color, setColor] = useState<RgbaColor>({ r: 200, g: 150, b: 35, a: 0.5 });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
      <Typography>{props.label}</Typography>
      <Box
        sx={{ bgcolor: RGBAToString(color), borderRadius: '100%', height: 20, width: 20 }}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { p: 2 }, '& .MuiMenu-list': { py: 0 } }}
      >
        <RgbaColorPicker color={color} onChange={setColor} />
        <Button color="error" size="small">
          Cancel
        </Button>
        <Button color="success" variant="contained" size="small">
          Apply
        </Button>
      </Menu>
    </Box>
  );
};
