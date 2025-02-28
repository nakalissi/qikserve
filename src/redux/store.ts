import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import settingsReducer from './settings';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
