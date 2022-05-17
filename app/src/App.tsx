import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from './core/redux/store';
import { ThemesProvider } from './core/theme/ThemeProvider';
import { AppRoutes } from './routes/routes';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ThemesProvider>
          <AppRoutes />
        </ThemesProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
