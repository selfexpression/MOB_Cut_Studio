import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  isOpenMenu: boolean;
  isOpenCategories: boolean;
  isOpenBrands: boolean;
  currentCategoryID: number | null;
  currentBrandNames: string[];
}

const initialState: FilterState = {
  isOpenMenu: false,
  isOpenCategories: false,
  isOpenBrands: false,
  currentCategoryID: null,
  currentBrandNames: [],
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleMenu: (state, { payload }: { payload: boolean }) => {
      state.isOpenMenu = payload;
    },
    toggleCategories: (state, { payload }: { payload: boolean }) => {
      state.isOpenCategories = payload;
    },
    toggleBrands: (state, { payload }: { payload: boolean }) => {
      state.isOpenBrands = payload;
    },
    setCurrentCategoryID: (
      state,
      { payload }: { payload: { id: number | null } },
    ) => {
      const { id } = payload;

      state.currentCategoryID = id;
    },
    setCurrentBrandNames: (
      state,
      {
        payload,
      }: {
        payload: { name: string; isCheckedInput: boolean } | null;
      },
    ) => {
      if (!payload) {
        state.currentBrandNames = [];
        return;
      }

      const { name, isCheckedInput } = payload;

      if (!isCheckedInput) {
        const emptyFilters = state.currentBrandNames.filter(
          (item) => item !== name,
        );
        state.currentBrandNames = emptyFilters;
        return;
      }

      state.currentBrandNames = [...state.currentBrandNames, name];
    },
  },
});

export const { actions, reducer } = slice;
