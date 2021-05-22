/**
*
* favoritos
*
* @version 1.0.1
* @author Alexey Istomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

var getContextGradientEntries = function getContextGradientEntries(backgrounds) {
  var arrayLength = backgrounds.length;
  var step = 1 / (arrayLength - 1);
  return backgrounds.map(function (background, index) {
    return [index * step, background];
  });
};

export { getContextGradientEntries };
