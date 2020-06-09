export const loadImage = (src: string, callback: Function): void => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.addEventListener(
    'load',
    () => {
      console.log('run')
      return callback(img);
    },
    { once: true }
  );
  img.addEventListener(
    'error',
    (err) => {
      console.log('run2')
      return callback(img);
    },
    { once: true }
  );
  img.src = src;
  console.log(img.src, 'here')
  console.log(src, 'here')
};
