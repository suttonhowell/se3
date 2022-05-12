import { ThemeProvider, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

interface ThemesProviderProps {
  children?: React.ReactNode;
}

export const ThemesProvider: FC<ThemesProviderProps> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};
