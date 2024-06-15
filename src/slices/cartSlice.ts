import { createSlice } from '@reduxjs/toolkit';

import type { CartItem } from '../types/interfaces';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  isOrderPlaced: boolean;
  isLoaded: boolean;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  isOrderPlaced: false,
  isLoaded: false,
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: { payload: CartItem }) => {
      const { items } = state;
      const { id, quantity } = payload;
      const existingItem = items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        return;
      }

      state.items = [...items, payload];
    },
    setCartItems: (state, { payload }: { payload: CartItem[] }) => {
      state.items = [...state.items, ...payload];
      state.isLoaded = true;
    },
    setEmptyCart: (state) => {
      state.items = [];
    },
    setTotalAmount: (state, { payload }: { payload: number }) => {
      state.totalAmount = payload;
    },
    toggleOrderStatus: (state, { payload }: { payload: boolean }) => {
      state.isOrderPlaced = payload;
    },
    updateQuantity: (
      state,
      {
        payload,
      }: {
        payload: { id: number; updateQuantityType: string };
      },
    ) => {
      const { items } = state;
      const { id, updateQuantityType } = payload;
      const currentItem = items.find((item) => item.id === id);
      const filteredItems = items.filter((item) => item.id !== id);

      if (!currentItem) return;

      switch (updateQuantityType) {
        case 'increment':
          currentItem.quantity += 1;
          break;
        case 'decrement': {
          if (currentItem.quantity <= 1) {
            state.items = filteredItems;
          }

          currentItem.quantity -= 1;
          break;
        }
        default:
          break;
      }
    },
  },
});

export const { actions, reducer } = slice;
