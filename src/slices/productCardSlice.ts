import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '../types/interfaces';

interface ProductCardState {
  currentProduct: Product | null;
  productsCount: number;
  productIsAdded: boolean;
}

const defaultValue = 1;

const initialState: ProductCardState = {
  currentProduct: null,
  productsCount: defaultValue,
  productIsAdded: false,
};

const slice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {
    setCurrentProduct: (state, { payload }: { payload: Product }) => {
      state.currentProduct = payload;
    },
    setProductAdded: (state, { payload }) => {
      state.productIsAdded = payload;
    },
    updateCounter: (state, { payload }) => {
      switch (payload) {
        case 'increment':
          state.productsCount += 1;
          break;
        case 'decrement':
          if (state.productsCount > 1) {
            state.productsCount -= 1;
          }
          break;
        default:
          break;
      }
    },
    resetCount: (state) => {
      state.productsCount = defaultValue;
    },
  },
});

export const { actions, reducer } = slice;
