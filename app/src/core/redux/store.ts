import { configureStore } from '@reduxjs/toolkit';
import AppSettingsSlice from './features/AppSettings';

export const store = configureStore({
  reducer: {
    appSettings: AppSettingsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
