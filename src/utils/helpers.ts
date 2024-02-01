export const trimFileExtension = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.');
  return filename.substring(0, lastDotIndex);
};
