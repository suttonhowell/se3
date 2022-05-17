import { Box, Container, Grid, Typography } from '@mui/material';
import { RecentMenu } from './components/RecentMenu';
import { StartMenu } from './components/StartMenu';

const Frontpage = () => {
  return (
    <Container maxWidth="md" sx={{ height: '100%' }}>
      <Grid container spacing={2} alignItems="center" sx={{ minHeight: '100%' }}>
        <Grid item xs={12} sm={6} md={6}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h1" color="textPrimary" sx={{ mb: 0.5 }}>
              DCR Maker
            </Typography>
            <Typography variant="h3" color="textSecondary">
              Graphs on the fly
            </Typography>
          </Box>
          <StartMenu />
          <RecentMenu />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <img src="/assets/frontpage.svg" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Frontpage;
