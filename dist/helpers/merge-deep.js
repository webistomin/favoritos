export var getObjectKeys = Object.keys;
export var isObject = function (item) {
    return item && typeof item === 'object' && !Array.isArray(item) && true;
};
export var mergeDeep = function (target, source) {
    var _a, _b;
    var sourceKeys = getObjectKeys(source);
    if (isObject(target) && isObject(source)) {
        for (var _i = 0, sourceKeys_1 = sourceKeys; _i < sourceKeys_1.length; _i++) {
            var key = sourceKeys_1[_i];
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return target;
};
//# sourceMappingURL=merge-deep.js.map