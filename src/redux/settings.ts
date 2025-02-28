import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { SettingsProps } from '../interfaces/types.interface';

const initialState: any = {
  settings: {},
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setup: (state, action: PayloadAction<any>) => {
      state.settings = action.payload;
    },
  }
});

export const { setup } = settings.actions;

export default settings.reducer;
