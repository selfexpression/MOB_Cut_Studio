import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenMenu: false,
};

const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleMenu: (state, { payload }: { payload: boolean }) => {
      state.isOpenMenu = payload;
    },
  },
});

export const { reducer, actions } = slice;
