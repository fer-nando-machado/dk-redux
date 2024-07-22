import { Platform } from "./Platform";

export const GRAVITY = -3;

export type Position = {
  x: number;
  y: number;
};

const boundaries: { min: Position; max: Position } = {
  min: { x: -2, y: -2 },
  max: { x: 500 - 20, y: 750 - 15 },
};

export const checkBoundaries = (position: Position): Position => {
  return {
    x: Math.max(boundaries.min.x, Math.min(position.x, boundaries.max.x)),
    y: Math.max(boundaries.min.y, Math.min(position.y, boundaries.max.y)),
  };
};

const isOnPlatform = (position: Position, platform: Platform): boolean => {
  const { x, y, length, angle = 0 } = platform;
  if (!length) return false;

  const characterX = position.x - x;
  const characterY = position.y - y;
  const radianAngle = -angle * (Math.PI / 180);
  const rotatedX =
    characterX * Math.cos(radianAngle) - characterY * Math.sin(radianAngle);
  const rotatedY =
    characterX * Math.sin(radianAngle) + characterY * Math.cos(radianAngle);

  const thickness = 25;
  const minX = 0 - thickness;
  const maxX = length;
  const minY = 0 - thickness;
  const maxY = thickness;

  return (
    rotatedX >= minX && rotatedX <= maxX && rotatedY >= minY && rotatedY <= maxY
  );
};

export const isOnPlatforms = (position: Position, platforms: Platform[]) => {
  for (const platform of platforms) {
    if (isOnPlatform(position, platform)) {
      return true;
    }
  }
  return false;
};
