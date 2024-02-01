import {
  getStorage, ref, listAll, getDownloadURL,
} from 'firebase/storage';

import { trimFileExtension } from '../utils/helpers';

export const loadImageData = async (folderPath: string) => {
  const storage = getStorage();
  const imagesRef = ref(storage, folderPath);

  try {
    const listResult = await listAll(imagesRef);
    const imagesDataPromises = listResult.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const width = trimFileExtension(itemRef.name);
      return { width, url };
    });

    const imageData = await Promise.all(imagesDataPromises);
    return imageData;
  } catch (error) {
    console.error(`Error loading folder with ${folderPath} images`, error);
    return [];
  }
};
