import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeGraph } from '../../core/redux/features/editor/editorSlice';
import { useAppDispatch } from '../../core/redux/hooks';
import { ProjectTitle } from './ProjectTitle';

export const TopBar = () => {
  const location = useLocation();
  const inEditor = location.pathname.includes('editor');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClick = (e: React.MouseEvent) => {
    if (inEditor) {
      navigate('/');
      dispatch(closeGraph());
    }
  };

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
            cursor: inEditor ? 'pointer' : 'default',
          }}
          onClick={handleOnClick}
        >
          <AccountTreeIcon fontSize="medium" />
        </Box>
        {inEditor ? (
          <ProjectTitle />
        ) : (
          <Typography variant="h5" noWrap component="div">
            DCR Graph Editor
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
