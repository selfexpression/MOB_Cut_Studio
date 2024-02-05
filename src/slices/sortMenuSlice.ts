import { createSlice } from '@reduxjs/toolkit';

interface SortState {
  isOpenMenu: boolean;
  currentValue: string;
}

const initialState: SortState = {
  isOpenMenu: false,
  currentValue: '',
};

const slice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    openSortMenu: (state, { payload }: { payload: boolean }) => {
      state.isOpenMenu = payload;
    },
    setCurrentValue: (state, { payload }: { payload: string }) => {
      state.currentValue = payload;
    },
  },
});

export const { actions, reducer } = slice;
