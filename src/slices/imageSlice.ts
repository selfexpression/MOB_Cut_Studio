import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backgroundImages: [],
};

const slice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, { payload }) => {
      const { folderPath, images } = payload;

      switch (folderPath) {
        case 'background':
          state.backgroundImages = images;
          break;
        default:
          break;
      }
    },
  },
});

export const { reducer, actions } = slice;
