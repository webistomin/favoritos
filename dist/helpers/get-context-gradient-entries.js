export var getContextGradientEntries = function (backgrounds) {
    var arrayLength = backgrounds.length;
    var step = 1 / (arrayLength - 1);
    return backgrounds.map(function (background, index) {
        return [index * step, background];
    });
};
//# sourceMappingURL=get-context-gradient-entries.js.map