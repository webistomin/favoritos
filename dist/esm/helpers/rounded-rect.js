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

var roundedRect = function roundedRect(context, x, y, width, height, radius) {
  var rectX = x;
  var rectY = y;
  var rectWidth = width;
  var rectHeight = height;
  var cornerRadius = Math.min(Math.max(width - 1, 1), Math.max(height - 1, 1), radius);
  context.lineJoin = 'round';
  context.lineWidth = cornerRadius;
  context.strokeRect(rectX + cornerRadius / 2, rectY + cornerRadius / 2, rectWidth - cornerRadius, rectHeight - cornerRadius);
  context.fillRect(rectX + cornerRadius / 2, rectY + cornerRadius / 2, rectWidth - cornerRadius, rectHeight - cornerRadius);
  context.stroke();
  context.fill();
};

export { roundedRect };
