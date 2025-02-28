import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProps } from '../interfaces/types.interface';

export interface CartState {
  items: CartProps[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartProps>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload });
      }
      state.total = getTotal(state);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
      state.total = getTotal(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  }
});

export const getTotal = (state: CartState) => {
  return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addItem, removeItem, clearCart } = cart.actions;

export default cart.reducer;
