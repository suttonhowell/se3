import { configureStore } from '@reduxjs/toolkit';
import EditorReducer from './features/editor/editorSlice';

export const store = configureStore({
  reducer: {
    editor: EditorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const dispatch: AppDispatch = store.dispatch;
