import { KeyboardArrowDown } from '@mui/icons-material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const zoomList = [25, 50, 75, 100, 150, 200];

export const TopToolbar = () => {
  const [hasHistory, setHasHistory] = useState<boolean>(true);
  const [hasSelected, setHasSelected] = useState<boolean>(true);
  const [zoomAnchor, setAnchorZoom] = useState<null | HTMLElement>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const zoomOpen = Boolean(zoomAnchor);
  const handleOnClickZoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorZoom(event.currentTarget);
  };
  const zoomHandleClose = (level: number) => {
    setZoomLevel(level);
    setAnchorZoom(null);
  };

  const handleOnClickUndo = () => {
    console.log('Undo!');
    setHasHistory((prev) => !prev);
  };

  const handleOnClickRedo = () => {
    console.log('Redo!');
    setHasHistory((prev) => !prev);
  };

  const handleOnClickHistory = () => {
    console.log('History!');
    setHasHistory((prev) => !prev);
  };

  const handleOnClickZoomIn = () => {
    console.log('Zoom in!');
    setZoomLevel((prev) => zoomList[zoomList.indexOf(prev) + 1]);
  };

  const handleOnClickZoomOut = () => {
    console.log('Zoom out!');
    setZoomLevel((prev) => zoomList[zoomList.indexOf(prev) - 1]);
  };

  const handleOnClickDelete = () => {
    console.log('Delete!');
    setHasSelected((prev) => !prev);
  };

  return (
    <>
      <AppBar position="relative" color="transparent" sx={{ bgcolor: 'grey.100' }}>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ px: 1 }}>
              <Tooltip title="Undo" arrow disableInteractive>
                <IconButton disabled={!hasHistory} onClick={handleOnClickUndo} aria-label="undo">
                  <UndoRoundedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Redo" arrow disableInteractive>
                <IconButton disabled={!hasHistory} onClick={handleOnClickRedo} aria-label="redo">
                  <RedoRoundedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="History" arrow disableInteractive>
                <IconButton disabled={!hasHistory} onClick={handleOnClickHistory} aria-label="history">
                  <HistoryRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, width: '80px' }}>
              <Tooltip title="Zoom" arrow disableInteractive>
                <Button onClick={handleOnClickZoom} endIcon={<KeyboardArrowDown />}>
                  {zoomLevel}%
                </Button>
              </Tooltip>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />
            <Box sx={{ px: 1 }}>
              <Tooltip title="Zoom in" arrow disableInteractive>
                <IconButton disabled={zoomList.indexOf(zoomLevel) === zoomList.length - 1} onClick={handleOnClickZoomIn} aria-label="zoomin">
                  <ZoomInRoundedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Zoom out" arrow disableInteractive>
                <IconButton disabled={zoomList.indexOf(zoomLevel) === 0} onClick={handleOnClickZoomOut} aria-label="zoomout">
                  <ZoomOutRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2 }} />
            <Box sx={{ px: 1 }}>
              <Tooltip title="Delete" arrow disableInteractive>
                <IconButton disabled={!hasSelected} onClick={handleOnClickDelete} aria-label="delete">
                  <DeleteRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={zoomAnchor}
        open={zoomOpen}
        onClose={zoomHandleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {zoomList.map((item, idx) => (
          <MenuItem key={item + idx} onClick={(_) => zoomHandleClose(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
