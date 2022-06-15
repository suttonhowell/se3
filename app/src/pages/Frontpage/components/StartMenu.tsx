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
import { createNewGraph } from '../../../core/redux/features/editor/editorSlice';
import { openGraph } from '../../../core/redux/features/editor/editorSlice';
import { dispatch } from '../../../core/redux/store';

const handleOnClickCreateNewGraph = () => {
  dispatch(createNewGraph());
};

const handleOnClickOpenGraph = async () => {
  //filepath contains the "jsonified" version of the graph
  const filePath = await window.fileApi.openFile();
  //convert back to graph
  if (filePath) dispatch(openGraph(filePath));

};

interface StartMenuItemProps {
  label: string;
  icon: React.ReactElement<SvgIconProps>;
  navigateTo?: string;
  clickAction?: () => void;
}

const startMenuItems: StartMenuItemProps[] = [
  {
    label: 'New graph...',
    icon: <CreateIcon />,
    navigateTo: '/editor',
    clickAction: handleOnClickCreateNewGraph,
  },
  {
    label: 'Open graph...',
    icon: <OpenIcon />,
    navigateTo: '/editor',
    clickAction: handleOnClickOpenGraph,
  },
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
                if (mi.clickAction) mi.clickAction();
                if (mi.navigateTo) navigate(mi.navigateTo);
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>{mi.icon}</ListItemIcon>
              <ListItemText primary={mi.label} primaryTypographyProps={{ color: 'textPrimary' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
