import { Inbox, Mail } from '@mui/icons-material';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Toolbar
} from '@mui/material';
import { Canvas } from '../components/Canvas';
import { TopBar } from '../components/layout/TopBar';

const drawerWidth = 56;

export const Main = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <TopBar />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 8, height: '100%' }}
      >
        <Canvas />
      </Box>
    </Box>
  );
};
