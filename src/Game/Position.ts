import { Platform } from "./Platform";

// might refactor to class
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

export const checkPlatforms = (position: Position, platforms: Platform[]) => {
  for (const platform of platforms) {
    if (isOnPlatform(position, platform)) {
      return true;
    }
  }
  return false;
};

const isOnPlatform = (position: Position, platform: Platform): boolean => {
  const { x, y, length } = platform;
  if (!length) return false;

  const characterX = position.x - x;
  const characterY = position.y - y;

  const thickness = 25 / 2;

  const isOnHorizontalPlatform =
    characterX >= 0 &&
    characterX <= length &&
    characterY >= -thickness &&
    characterY <= thickness;

  const isOnVerticalPlatform =
    characterY >= 0 &&
    characterY <= length &&
    characterX >= -thickness &&
    characterX <= thickness;

  return isOnHorizontalPlatform || isOnVerticalPlatform;
};
