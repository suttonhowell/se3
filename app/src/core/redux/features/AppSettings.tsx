import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppSettingsState {
  value: number;
}

const initialState: AppSettingsState = {
  value: 0
};

export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
