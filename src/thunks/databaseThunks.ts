import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Firestore } from '@firebase/firestore';

import { actions } from '../slices/databaseSlice';
import type { AppDispatch, RootState } from '../types/aliases';
import { getProductCategoryData } from '../services/databaseService';

export const loadData = createAsyncThunk(
  'database/loadData',
  async ({ db }: { db: Firestore }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { categories, products } = state.database;

    if (!!categories.length || !!products.length) return;

    try {
      const database = await getProductCategoryData(db);

      const payload = {
        categories: database.categories,
        products: database.products,
      };

      dispatch(actions.setDatabase(payload));
      dispatch(actions.setIsLoaded(true));
    } catch (error) {
      console.error('Error loading data from Firestore:', error);
      throw error;
    }
  },
);

export const filterProducts = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { currentBrandNames, currentCategoryID } = getState().filter;
  const payload = { currentBrandNames, currentCategoryID };
  dispatch(actions.filterProducts(payload));
};
