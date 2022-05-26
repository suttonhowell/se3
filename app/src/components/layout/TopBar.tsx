import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Routes, useLocation } from 'react-router-dom';
import { ProjectTitle } from './ProjectTitle';

export const TopBar = () => {
  let isInEditor = true; // TODO get this info from router
  var location = useLocation()

  return (
    <AppBar
      position="relative"
      elevation={1}
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <Toolbar disableGutters sx={{ px: 2 }}>
        <Box
          sx={{
            p: 1.5,
            mr: 2,
            lineHeight: 1,
            bgcolor: '#00000040',
            borderRadius: '100%',
            display: 'flex',
          }}
        >
          <AccountTreeIcon fontSize="medium" />
        </Box>
        {(location.pathname.includes("editor")) ? (
          <ProjectTitle />
        ) : (
          <Typography variant="h6" noWrap component="div">
            DCR Graph Editor
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
