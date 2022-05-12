import { ThemeProvider } from '@mui/system';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import lightTheme from './core/theme/lightTheme';
import { AppRoutes } from './routes/routes';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={lightTheme}>
        <AppRoutes />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
