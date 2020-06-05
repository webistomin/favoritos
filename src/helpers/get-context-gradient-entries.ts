export const getContextGradientEntries = (backgrounds: string[]): [number, string][] => {
  const arrayLength = backgrounds.length;
  const step = 1 / arrayLength;

  return backgrounds.map((background, index) => {
    return [index * step, background];
  });
};
