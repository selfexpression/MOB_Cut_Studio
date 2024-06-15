import { createSlice } from '@reduxjs/toolkit';

import type { DatabaseState, ProductCategoryData } from '../types/interfaces';
import { sortedMap, sortedByStock, type SortedMap } from '../utils/helpers';

import { actions as sortActions } from './sortMenuSlice';

const initialState: DatabaseState = {
  categories: [],
  products: [],
  initialProducts: [],
  filteredProducts: [],
  isLoaded: false,
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setIsLoaded: (state, { payload }: { payload: boolean }) => {
      state.isLoaded = payload;
    },
    setDatabase: (state, { payload }: { payload: ProductCategoryData }) => {
      const { products, categories } = payload;
      state.categories = categories;
      state.products = sortedByStock(products);
      state.initialProducts = sortedByStock(products);
    },
    filterProducts: (
      state,
      {
        payload,
      }: {
        payload: {
          currentBrandNames: string[];
          currentCategoryID: number | null;
        };
      },
    ) => {
      const { initialProducts } = state;
      const { currentBrandNames, currentCategoryID } = payload;

      state.filteredProducts = initialProducts;

      state.filteredProducts = currentBrandNames.length
        ? state.filteredProducts.filter((product) =>
            currentBrandNames.includes(product.brand.toLowerCase()),
          )
        : state.filteredProducts;

      state.filteredProducts = currentCategoryID
        ? state.filteredProducts.filter(
            (product) => product.categoryID === currentCategoryID,
          )
        : state.filteredProducts;

      state.products = state.filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      sortActions.setCurrentValue,
      (state, { payload: currentValue }) => {
        const sortingFunction = sortedMap[currentValue as keyof SortedMap];
        const sortedProducts = sortingFunction(state.products);
        const sortedFilteredProducts = sortingFunction(state.filteredProducts);

        state.products = sortedProducts;
        state.filteredProducts = sortedFilteredProducts;
      },
    );
  },
});

export const { actions, reducer } = slice;
