import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  isOpenMenu: boolean;
  currentCategoryID: number | null;
  currentBrandNames: string[];
}

const initialState: FilterState = {
  isOpenMenu: false,
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
    setCurrentCategoryID: (state, { payload }: { payload: { id: number | null } }) => {
      const { id } = payload;

      state.currentCategoryID = id;
    },
    setCurrentBrandNames: (state, { payload }:
      { payload: { name: string, isCheckedInput: boolean } }) => {
      const { name, isCheckedInput } = payload;

      if (!isCheckedInput) {
        const emptyFilters = state.currentBrandNames.filter((item) => item !== name);
        state.currentBrandNames = emptyFilters;
        return;
      }

      state.currentBrandNames = [...state.currentBrandNames, name];
    },
  },
});

export const { actions, reducer } = slice;
