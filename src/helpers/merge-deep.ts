export const getObjectKeys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];

export const isObject = (item: object): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item) && true;
};

export const mergeDeep = (target: object, source: object): object => {
  const sourceKeys = getObjectKeys(source);

  if (isObject(target) && isObject(source)) {
    for (const key of sourceKeys) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
};
