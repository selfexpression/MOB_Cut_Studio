import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenWidget: false,
  currentEmployeeId: 0,
};

const slice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    toggleWidget: (state, { payload }: { payload: boolean }) => {
      state.isOpenWidget = payload;
    },
    setCurrentEmployeeId: (state, { payload }: { payload: number }) => {
      state.currentEmployeeId = payload;
    },
  },
});

export const { actions, reducer } = slice;
