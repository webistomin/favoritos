/**
*
* favoritos
*
* @version 1.0.1
* @author undefined
* @email: undefined
* @license: MIT
*
**/

var loadImage = function loadImage(src, callback) {
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.addEventListener('load', function () {
    return callback(img);
  }, {
    once: true
  });
  img.addEventListener('error', function () {
    return callback(img);
  }, {
    once: true
  });
  img.src = src;
};

export { loadImage };
