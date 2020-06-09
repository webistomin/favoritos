export const loadImage = (src: string, callback: Function): void => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.addEventListener(
    'load',
    () => {
      return callback(img);
    },
    { once: true }
  );
  img.addEventListener(
    'error',
    () => {
      return callback(img);
    },
    { once: true }
  );
  img.src = src;
};
