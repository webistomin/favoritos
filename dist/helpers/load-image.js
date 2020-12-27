export var loadImage = function (src, callback) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', function () {
        return callback(img);
    }, { once: true });
    img.addEventListener('error', function () {
        return callback(img);
    }, { once: true });
    img.src = src;
};
//# sourceMappingURL=load-image.js.map