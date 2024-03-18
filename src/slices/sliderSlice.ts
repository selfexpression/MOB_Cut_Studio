import { createSlice } from '@reduxjs/toolkit';

import { sliderImages } from '../assets/slider';

const initialState = {
  currentSlide: 0,
  images: sliderImages,
};

const slice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    toggleSlide: (state, { payload }: { payload: string }) => {
      const { currentSlide, images } = state;

      switch (payload) {
        case 'next':
          state.currentSlide = (currentSlide + 1) % images.length;
          break;
        case 'prev':
          state.currentSlide = (currentSlide + (images.length - 1)) % images.length;
          break;
        default:
          break;
      }
    },
  },
});

export const { reducer, actions } = slice;
