import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenWidget: false,
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleWidget: (state, { payload }: { payload: boolean }) => {
      state.isOpenWidget = payload;
    },
  },
});

export const { reducer, actions } = slice;
