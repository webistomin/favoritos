/**
*
* favoritos
*
* @version 1.1.0
* @author Alexey Istomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

var getObjectKeys = Object.keys;
var isObject = function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item) && true;
};
var mergeDeep = function mergeDeep(target, source) {
  var sourceKeys = getObjectKeys(source);

  if (isObject(target) && isObject(source)) {
    for (var _i2 = 0; _i2 < sourceKeys.length; _i2++) {
      var key = sourceKeys[_i2];

      if (isObject(source[key])) {
        if (!target[key]) {
          var _Object$assign;

          Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
        }

        mergeDeep(target[key], source[key]);
      } else {
        var _Object$assign2;

        Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
      }
    }
  }

  return target;
};

export { getObjectKeys, isObject, mergeDeep };
