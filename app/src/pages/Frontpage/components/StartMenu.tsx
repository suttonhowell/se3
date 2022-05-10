import { FolderOpenOutlined as OpenIcon, NoteAddOutlined as CreateIcon } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface StartMenuItemProps {
  label: string;
  icon: React.ReactElement<SvgIconProps>;
  navigateTo?: string;
}

const startMenuItems: StartMenuItemProps[] = [
  { label: 'New graph...', icon: <CreateIcon />, navigateTo: '/editor' },
  { label: 'Open graph...', icon: <OpenIcon /> },
];

export const StartMenu = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 0.5 }}>
        Start
      </Typography>
      <List dense disablePadding>
        {startMenuItems.map((mi) => (
          <ListItem key={mi.label} disableGutters disablePadding>
            <ListItemButton
              disableGutters
              onClick={() => {
                if (mi.navigateTo) navigate(mi.navigateTo);
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{mi.icon}</ListItemIcon>
              <ListItemText primary={mi.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
