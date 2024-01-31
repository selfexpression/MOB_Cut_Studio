import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentSlide: 0,
  images: [],
};

const slice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    nextSlide: (state) => {
      const { currentSlide, images } = state;
      state.currentSlide = (currentSlide + 1) % images.length;
    },
    prevSlide: (state) => {
      const { currentSlide, images } = state;
      state.currentSlide = (currentSlide + (images.length - 1)) % images.length;
    },
  },
});

export const { reducer, actions } = slice;
