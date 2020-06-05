export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => resolve(img), { once: true });
    img.addEventListener('error', (err) => reject(err), { once: true });
    img.src = src;
  });
};
