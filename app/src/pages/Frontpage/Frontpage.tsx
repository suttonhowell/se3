import { Box, Container, Grid, Typography } from '@mui/material';
import { FrontpageImage } from './components/FronPageImage';
import { RecentMenu } from './components/RecentMenu';
import { StartMenu } from './components/StartMenu';

const Frontpage = () => {
  return (
    <Container maxWidth="md" sx={{ height: '100%', px: 3 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100%' }}
      >
        <Grid item xs={12} sm={8} md={6}>
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
        <Grid item xs={false} sm={false} md={6}>
          <Box display={{ xs: 'none', md: 'block' }}>
            <FrontpageImage />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Frontpage;
