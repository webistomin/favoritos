export const roundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void => {
  const rectX = x;
  const rectY = y;
  const rectWidth = width;
  const rectHeight = height;
  const cornerRadius = Math.min(Math.max(width - 1, 1), Math.max(height - 1, 1), radius);

  context.lineJoin = 'round';
  context.lineWidth = cornerRadius;
  context.strokeRect(
    rectX + cornerRadius / 2,
    rectY + cornerRadius / 2,
    rectWidth - cornerRadius,
    rectHeight - cornerRadius
  );
  context.fillRect(
    rectX + cornerRadius / 2,
    rectY + cornerRadius / 2,
    rectWidth - cornerRadius,
    rectHeight - cornerRadius
  );
  context.stroke();
  context.fill();
};
