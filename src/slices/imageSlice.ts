import { createSlice } from '@reduxjs/toolkit';

interface Image {
  width: string;
  url: string;
}

interface InitialState {
  backgroundImages: Image[];
}

interface Payload {
  payload: {
    folderPath: string;
    images: Image[];
  }
}

const initialState: InitialState = {
  backgroundImages: [],
};

const slice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, { payload }: Payload) => {
      const { folderPath, images } = payload;
      const sortedByWidth = images.sort((a, b) => +a.width - +b.width);

      switch (folderPath) {
        case 'background':
          state.backgroundImages = sortedByWidth;
          break;
        default:
          break;
      }
    },
  },
});

export const { reducer, actions } = slice;
