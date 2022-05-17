import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const recentFilesMenuItems = [
  { fileName: 'projectDecision.dcr', path: '~/Documents/Projects/SEA/Graphs' },
  { fileName: 'expenseMilestone.dcr', path: '~/Development/GraphsMakers' },
  { fileName: 'bussinesProcess.dcr', path: '~/Work/Projects/SEA/Graphs' },
  { fileName: 'projectDecision.dcr', path: '~/Documents/Projects/SEA/Graphs' },
  { fileName: 'projectDecision.dcr', path: '~/Documents/Projects/SEA/Graphs' },
  { fileName: 'More...', path: '' },
];

export const RecentMenu = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 0.5 }}>
        Recent
      </Typography>
      <List dense disablePadding>
        {recentFilesMenuItems.map((fmi, idx) => (
          <ListItem key={fmi.fileName + idx} disableGutters disablePadding>
            <ListItemText
              primary={fmi.fileName}
              primaryTypographyProps={{ color: 'textPrimary' }}
              secondary={fmi.path}
              sx={{
                my: '3px',
                '& .MuiListItemText-primary, & .MuiListItemText-secondary': {
                  display: 'inline-block',
                },
                '& .MuiListItemText-secondary': {
                  pl: 1,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
