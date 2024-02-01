import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadImageData } from '../services/imageService';
import { actions } from '../slices/imageSlice';

export const loadImageFolder = createAsyncThunk(
  'storage/loadImagesFolder',
  async ({ folderPath }: { folderPath: string }, { dispatch }) => {
    try {
      const images = await loadImageData(folderPath);
      dispatch(actions.setImages({ folderPath, images }));
    } catch (error) {
      console.error(`Error loading folder with ${folderPath} images`, error);
      throw error;
    }
  },
);
