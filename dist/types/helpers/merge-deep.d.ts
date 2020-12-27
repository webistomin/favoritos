export declare const getObjectKeys: <T>(o: T) => Extract<keyof T, string>[];
export declare const isObject: (item: object) => boolean;
export declare const mergeDeep: (target: object, source: object) => object;
