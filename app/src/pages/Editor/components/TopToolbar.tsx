import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

export const TopToolbar = () => {
  const [hasHistory, setHasHistpry] = useState<boolean>(false);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.clientX, e.clientY);
    setHasHistpry((prevState) => (
      !prevState
    ))
  };

  return (
    <AppBar position="relative" color='transparent' sx={{bgcolor: 'grey.100'}}>
      <Toolbar disableGutters>
        <Box sx={{display: 'flex'}}>
          <Box sx={{px: 1}}>
            <IconButton onClick={handleOnClick} aria-label="undo">
              <UndoRoundedIcon />
            </IconButton>
            <IconButton onClick={handleOnClick} aria-label="redo">
              <RedoRoundedIcon />
            </IconButton>
            <IconButton onClick={handleOnClick} aria-label="history">
              <HistoryRoundedIcon />
            </IconButton>
          </Box>
          <Divider orientation='vertical' flexItem sx={{borderRightWidth: 2}} />
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2}}>
            <Typography onClick={handleOnClick}>100%</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={{borderRightWidth: 2}} />
          <Box sx={{px: 1}}>
            <IconButton onClick={handleOnClick} aria-label="zoomin">
              <ZoomInRoundedIcon />
            </IconButton>
            <IconButton onClick={handleOnClick} aria-label="zoomout">
              <ZoomOutRoundedIcon />
            </IconButton>
          </Box>
          <Divider orientation='vertical' flexItem sx={{borderRightWidth: 2}} />
          <Box sx={{px: 1}}>
            <IconButton onClick={handleOnClick} aria-label="delete">
              <DeleteRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
